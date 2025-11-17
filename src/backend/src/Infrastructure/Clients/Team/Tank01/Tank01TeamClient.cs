using System.Text.Json;
using Application.Interfaces;
using Application.Models.Team;
using Microsoft.AspNetCore.WebUtilities;

namespace Infrastructure.Clients.Team.Tank01;

public class Tank01TeamClient(HttpClient client) : ITeamClient
{
    public async Task<TeamInfoDto> GetTeamInfo(string name)
    {
        var teamsResponse = await GetTeams();
        
        var teams = JsonSerializer.Deserialize<Tank01TeamInfoResponse>(await teamsResponse.Content.ReadAsStringAsync())?.Body;
        if (teams == null || teams.Count == 0)
            throw new HttpRequestException("Failed to parse team data from response");

        var team = teams.FirstOrDefault(x => string.Equals(x.Name, name, StringComparison.OrdinalIgnoreCase));
        if (team == null)
            throw new HttpRequestException($"Team '{name}' not found");
        
        var teamDto = new TeamInfoDto
        {
            City = team.TeamCity,
            Conference = team.Conference,
            Division = team.Division,
            LogoURL = team.NflComLogo1,
            Name = team.Name,
            Wins = int.Parse(team.Wins),
            Losses = int.Parse(team.Losses),
            Ties = int.Parse(team.Ties),
        };

        return teamDto;
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