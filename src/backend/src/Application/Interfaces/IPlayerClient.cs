using Application.Models.Player;

namespace Application.Interfaces;

public interface IPlayerClient
{
    Task<PlayerInfoDto[]> GetPlayerInfo(string[]? names = null, string[]? ids = null);

    Task<PlayerInfoDto[]> SearchPlayers(string name = "", string id = "");
}