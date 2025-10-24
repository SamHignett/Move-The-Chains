using Application.Models.Team;

namespace Application.Interfaces;

public interface ITeamClient
{
    Task<TeamInfoDto> GetTeamInfo(string name);
}