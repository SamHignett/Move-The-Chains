using Application.Models.Team;

namespace Application.Interfaces;

public interface ITeamClient
{
    Task<TeamInfoDto> GetTeamInfo(string name = "", string id = "");
    
    Task<TeamInfoDto[]> GetTeams(string name, string sortBy);
    
    Task<TeamStatsDto[]> GetTeamStats(string name);
    
    Task<TeamTopPerformersDto[]> GetTopTeamPerformers(string name);
    
    Task<ScheduleDto> GetTeamSchedule(string name, string season = "");
}