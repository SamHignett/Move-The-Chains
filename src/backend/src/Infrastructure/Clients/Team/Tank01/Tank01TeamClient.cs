using System.Text.Json;
using Application.Interfaces;
using Application.Models.Team;
using Infrastructure.Clients.Team.Tank01.Models;
using Infrastructure.Clients.Team.Tank01.Responses;
using Microsoft.AspNetCore.WebUtilities;

namespace Infrastructure.Clients.Team.Tank01;

public class Tank01TeamClient(HttpClient client) : ITeamClient
{
    public async Task<TeamInfoDto> GetTeamInfo(string name = "", string id = "")
    {
        if (string.IsNullOrEmpty(id) && string.IsNullOrEmpty(name))
            throw new ArgumentException("Either team name or team ID must be provided");
        
        var teamsResponse = await GetTeams();
        
        var teams = JsonSerializer.Deserialize<Tank01TeamInfoResponse>(await teamsResponse.Content.ReadAsStringAsync())?.Body;
        if (teams == null || teams.Count == 0)
            throw new HttpRequestException("Failed to parse team data from response");

        Tank01TeamDto? team;
        if (!string.IsNullOrEmpty(name))
             team = teams.FirstOrDefault(x => string.Equals(x.Name, name, StringComparison.OrdinalIgnoreCase));
        else
            team = teams.FirstOrDefault(x => string.Equals(x.ID, id, StringComparison.OrdinalIgnoreCase));
        
        return team == null ? throw new HttpRequestException($"Team '{name}/{id}' not found") : team.ToTeamInfoDto();
    }

    //TODO: Convert sorting to take enum & convert to string (avoid using specific Third-party in interface)
    public async Task<TeamInfoDto[]> GetTeams(string name, string sortBy = "")
    {
        var parameters = new Dictionary<string, string>
        {
            { $"sortBy", sortBy }
        };
        
        var teamsResponse = await GetTeams(parameters);
        
        var teams = JsonSerializer.Deserialize<Tank01TeamInfoResponse>(await teamsResponse.Content.ReadAsStringAsync())?.Body;
        if (teams == null || teams.Count == 0)
            return [];

        var matchingTeams = teams.Where(t => 
            t.Name.Contains(name, StringComparison.OrdinalIgnoreCase) || t.TeamCity.Contains(name, StringComparison.OrdinalIgnoreCase));

        var teamDtos= matchingTeams.Select(t => t.ToTeamInfoDto());
        
        return teamDtos.ToArray();
    }

    public async Task<TeamStatsDto[]> GetTeamStats(string name)
    {
        var query = new Dictionary<string, string>
        {
            { "teamStats", "true" }
        };
        
        var teamsResponse = await GetTeams(query);
        
        var teamsStats = JsonSerializer.Deserialize<Tank01TeamInfoResponse>(await teamsResponse.Content.ReadAsStringAsync())?.Body;
        if (teamsStats == null || teamsStats.Count == 0)
            return [];
        
        var matchingTeams = teamsStats.Where(t => 
            t.Name.Contains(name, StringComparison.OrdinalIgnoreCase) || t.TeamCity.Contains(name, StringComparison.OrdinalIgnoreCase));

        var teamStatsDtos = matchingTeams.Select(t => t.ToTeamStatsDto());
        
        return teamStatsDtos.ToArray();
    }
    
    public async Task<TeamTopPerformersDto[]> GetTopTeamPerformers(string name)
    {
        var query = new Dictionary<string, string>
        {
            { "topPerformers", "true" }
        };
        
        var teamsResponse = await GetTeams(query);
        
        var teamsStats = JsonSerializer.Deserialize<Tank01TeamInfoResponse>(await teamsResponse.Content.ReadAsStringAsync())?.Body;
        if (teamsStats == null || teamsStats.Count == 0)
            return [];
        
        var matchingTeams = teamsStats.Where(t => 
            t.Name.Contains(name, StringComparison.OrdinalIgnoreCase) || t.TeamCity.Contains(name, StringComparison.OrdinalIgnoreCase));

        var topPerformerDtos = matchingTeams.Select(t => t.ToTeamTopPerformersDto());
        
        return topPerformerDtos.ToArray();
    }

    public async Task<ScheduleDto> GetTeamSchedule(string name, string season = "")
    {
        var teamsResponse = await GetTeams();
        var teams = JsonSerializer.Deserialize<Tank01TeamInfoResponse>(await teamsResponse.Content.ReadAsStringAsync())?.Body;
        if (teams == null || teams.Count == 0)
            throw new HttpRequestException("Failed to parse team data from response");
        
        var teamInfo = teams.FirstOrDefault(t => t.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        
        if (teamInfo == null)
            throw new HttpRequestException($"No team with matching name '{name}' found");
        
        var uri = "getNFLTeamSchedule";
        
        uri = QueryHelpers.AddQueryString(uri, "teamID", teamInfo.ID);
        
        if (string.IsNullOrEmpty(season))
            season = DateTime.Now.Year.ToString();
        
        uri = QueryHelpers.AddQueryString(uri, "season", season);
        
        HttpResponseMessage response = await client.GetAsync(uri);
        response.EnsureSuccessStatusCode();
        
        var scheduleResponse = JsonSerializer.Deserialize<Tank01TeamScheduleResponse>(await response.Content.ReadAsStringAsync())?.Body;
        
        if (scheduleResponse == null)
            throw new HttpRequestException("Failed to parse team schedule data from response");
        
        var scheduleDto = scheduleResponse.ToScheduleDto();
        
        var teamDict = teams.ToDictionary(x => x.ID, x => x);
        foreach (var game in scheduleDto.Games)
        {
            if (teamDict.TryGetValue(game.HomeTeamID, out var homeTeam))
            {
                game.HomeTeamName = homeTeam.Name;
            }
            
            if (teamDict.TryGetValue(game.AwayTeamID, out var awayTeam))
            {
                game.AwayTeamName = awayTeam.Name;
            }
        }
        
        return scheduleDto;
    }


    private async Task<HttpResponseMessage> GetTeams(Dictionary<string, string>? parameters = null)
    {
        var uri = "getNFLTeams";

        if (parameters != null)
            uri = parameters.Where(parameter => !string.IsNullOrEmpty(parameter.Value))
                .Aggregate(uri, (current, parameter) 
                => QueryHelpers.AddQueryString(current, parameter.Key, parameter.Value));
        
        HttpResponseMessage response = await client.GetAsync($"{uri}");
        response.EnsureSuccessStatusCode();

        return response;
    }
}