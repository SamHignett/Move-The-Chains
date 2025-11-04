using Application.Models.Player;

namespace Application.Interfaces;

public interface IPlayerClient
{
    Task<PlayerInfoDto> GetPlayerInfo(string name);

    Task<PlayerInfoDto[]> SearchPlayers(string name);
}