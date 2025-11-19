using Application.Models.Team;

namespace Application.Interfaces;

public interface ITeamClient
{
    Task<TeamInfoDto> GetTeamInfo(string name);
    
    Task<TeamInfoDto[]> GetTeams(string name, string sortBy);
    
    Task<TeamStatsDto[]> GetTeamStats(string name);
    
    Task<TeamTopPerformersDto[]> GetTopTeamPerformers(string name);
}