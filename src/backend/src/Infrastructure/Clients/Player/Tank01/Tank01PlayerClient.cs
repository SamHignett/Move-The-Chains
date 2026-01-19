using System.Text.Json;
using Application.Interfaces;
using Application.Models.Player;
using Infrastructure.Clients.Player.Tank01.Models;
using Infrastructure.Clients.Player.Tank01.Responses;
using Microsoft.AspNetCore.WebUtilities;

namespace Infrastructure.Clients.Player.Tank01;

public class Tank01PlayerClient(HttpClient client) : IPlayerClient
{
    public async Task<PlayerInfoDto[]> GetPlayerInfo(string[]? names, string[]? ids)
    {
        if ((names == null || names.Length == 0) && (ids == null || ids.Length == 0))
        {
            throw new ArgumentException("Either name or id must be provided");
        }

        var playerDtos = new List<PlayerInfoDto>();

        if (ids is { Length: > 0 })
        {
            var fetchedIds = new HashSet<string>();
            
            foreach (var playerID in ids)
            {
                if (fetchedIds.Contains(playerID))
                    continue;
            
                var players = await SearchPlayers(id: playerID);

                if (players.Length > 0)
                {
                    fetchedIds.Add(playerID);
                    playerDtos.Add(players.First());
                }
                    
            }

        }
        else if (names is {Length: > 0})
        { 
            foreach (var playerName in names)
            {
                var players = await SearchPlayers(playerName);

                if (players.Length > 0)
                    playerDtos.AddRange(players);
            }
        }


        return playerDtos.ToArray();
    }

    public async Task<PlayerStatsDto> GetPlayerStats(string name = "", string id = "")
    {
        if (string.IsNullOrEmpty(name) && string.IsNullOrEmpty(id))
        {
            throw new ArgumentException("Either name or id must be provided");
        }
        
        var players = await QueryPlayers(name, id, true);
        

        var playerDto = players.First().ToPlayerStatsDto();

        return playerDto;
    }

    public async Task<PlayerInfoDto[]> SearchPlayers(string name = "", string id = "")
    {
        var players = await QueryPlayers(name, id);
        
        if (players.Length == 0)
            return [];

        var playerDtos = players.Select(p => new PlayerInfoDto()
        {
            Name = p.Name,
            Id = p.ID,
            Age = int.TryParse(p.Age, out var age) ? age : 0,
            Height = p.Height,
            Weight = p.Weight,
            School = p.School,
            CurrentTeam = p.Team,
            Position = p.Position,
            HeadshotImageUrl = p.HeadshotImageUrl,
        });
        
        return playerDtos.ToArray();
    }

    private async Task<Tank01PlayerInfoDto[]> QueryPlayers(string name, string id, bool getStats = false)
    {
        var query = $"getNFLPlayerInfo";
        
        if (!string.IsNullOrEmpty(name))
            query = QueryHelpers.AddQueryString(query, "playerName", name);
        
        if (!string.IsNullOrEmpty(id))
            query = QueryHelpers.AddQueryString(query, "playerID", id);
        
        query = QueryHelpers.AddQueryString(query, "getStats", getStats ? "true" : "false");
        
        using HttpResponseMessage response = await client.GetAsync(query);
        response.EnsureSuccessStatusCode();
        
        var players = new List<Tank01PlayerInfoDto>();
        if (!string.IsNullOrEmpty(name))
        {
            var responsePlayers = JsonSerializer.Deserialize<Tank01PlayerInfoResponse>(await response.Content.ReadAsStringAsync())?.Body;

            responsePlayers?.ForEach(p => players.Add(p));
        }
        else
        {
            var player = JsonSerializer.Deserialize<Tank01SinglePlayerInfoResponse>(await response.Content.ReadAsStringAsync())?.Body;
            
            if (player != null)
                players.Add(player);
        }

        return players.ToArray();
    }
}