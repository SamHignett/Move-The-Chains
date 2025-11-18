using System.Text.Json;
using Application.Interfaces;
using Application.Models.Player;
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

    public async Task<PlayerInfoDto[]> SearchPlayers(string name = "", string id = "")
    {
        var query = $"getNFLPlayerInfo";
        
        if (!string.IsNullOrEmpty(name))
            query = QueryHelpers.AddQueryString(query, "playerName", name);


        if (!string.IsNullOrEmpty(id))
            query = QueryHelpers.AddQueryString(query, "playerID", id);
        
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
        
        if (players.Count == 0)
            return [];

        var playerDtos = players.Select(p => new PlayerInfoDto()
        {
            Name = p.PlayerName,
            Id = p.ID,
            Age = int.TryParse(p.Age, out var age) ? age : 0,
            Height = p.Height,
            Weight = p.Weight,
            School = p.School,
            CurrentTeam = p.Team,
            Position = p.Position,
            HeadshotImageUrl = p.HeadshotImageUrl
        });
        
        return playerDtos.ToArray();
    }
}