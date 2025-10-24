using System.Text.Json;
using Application.Interfaces;
using Application.Models.Player;

namespace Infrastructure.Clients.Player.Tank01;

public class Tank01PlayerClient(HttpClient client) : IPlayerClient
{
    public async Task<PlayerInfoDto> GetPlayerInfo(string name)
    {
        using HttpResponseMessage response = await client.GetAsync($"getNFLPlayerInfo?playerName={Uri.EscapeDataString(name)}");
        response.EnsureSuccessStatusCode();

        var player = JsonSerializer.Deserialize<Tank01PlayerInfoResponse>(await response.Content.ReadAsStringAsync())?.Body;
        
        if (player == null)
            throw new HttpRequestException($"Player '{name}' not found");
        
        var playerDto = new PlayerInfoDto
        {
            Name = player.PlayerName,
            CurrentTeam = player.Team,
        };

        return playerDto;
    }
}