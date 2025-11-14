using Application.Models.Player;

namespace Application.Interfaces;

public interface IPlayerClient
{
    Task<PlayerInfoDto> GetPlayerInfo(string name, string id);

    Task<PlayerInfoDto[]> SearchPlayers(string name);
}