using System.Text.Json;
using Application.Interfaces;
using Application.Models.Team;

namespace Infrastructure.Clients.Team.Tank01;

public class Tank01TeamClient(HttpClient client) : ITeamClient
{
    public async Task<TeamInfoDto> GetTeamInfo(string name)
    {
        using HttpResponseMessage response = await client.GetAsync($"getNFLTeams");
        response.EnsureSuccessStatusCode();
        
        var teams = JsonSerializer.Deserialize<Tank01TeamInfoResponse>(await response.Content.ReadAsStringAsync())?.Body;
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
}