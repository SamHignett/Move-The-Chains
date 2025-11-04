using System.Text.Json;
using Application.Interfaces;
using Application.Models.Player;

namespace Infrastructure.Clients.Player.Tank01;

public class Tank01PlayerClient(HttpClient client) : IPlayerClient
{
    public async Task<PlayerInfoDto> GetPlayerInfo(string name)
    {
        var url = $"getNFLPlayerInfo?playerName={Uri.EscapeDataString(name)}";
        
        using HttpResponseMessage response = await client.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var player = JsonSerializer.Deserialize<Tank01PlayerInfoResponse>(await response.Content.ReadAsStringAsync())?.Body.First();
        
        if (player == null)
            throw new HttpRequestException($"Player '{name}' not found");
        
        var playerDto = new PlayerInfoDto
        {
            Name = player.PlayerName,
            Age = int.TryParse(player.Age, out var age) ? age : 0,
            Height = player.Height,
            Weight = player.Weight,
            School = player.School,
            CurrentTeam = player.Team,
            Position = player.Position,
            HeadshotImageUrl = player.HeadshotImageUrl
        };

        return playerDto;
    }

    public async Task<PlayerInfoDto[]> SearchPlayers(string name)
    {
        var url = $"getNFLPlayerInfo?playerName={Uri.EscapeDataString(name)}";
        
        using HttpResponseMessage response = await client.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var players = JsonSerializer.Deserialize<Tank01PlayerSearchResponse>(await response.Content.ReadAsStringAsync())?.Body;

        if (players == null || players.Count == 0)
            return [];

        var playerDtos = players.Select(p => new PlayerInfoDto()
        {
            Name = p.PlayerName,
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