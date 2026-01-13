using Application.Models.Player;

namespace Application.Interfaces;

public interface IPlayerClient
{
    Task<PlayerInfoDto[]> GetPlayerInfo(string[]? names = null, string[]? ids = null);
    
    Task<PlayerStatsDto> GetPlayerStats(string name = "", string id = "");

    Task<PlayerInfoDto[]> SearchPlayers(string name = "", string id = "");
}