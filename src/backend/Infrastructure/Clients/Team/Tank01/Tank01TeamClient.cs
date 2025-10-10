using System.Text.Json;
using Application.Interfaces;
using Application.Models.Team;
using AutoMapper;

namespace Infrastructure.Clients.Team.Tank01;

public class Tank01TeamClient(HttpClient client) : ITeamClient
{
    public Task<TeamInfoDto> GetTeamInfo(string name)
    {
        using HttpResponseMessage response = client.GetAsync($"getNFLTeams").Result;
        response.EnsureSuccessStatusCode();

        var teams = JsonSerializer.Deserialize<Tank01TeamDto[]>(response.Content.ReadAsStringAsync().Result);
        if (teams == null || teams.Length == 0)
            throw new Exception("No teams found");

        var team = teams.First(x => x.TeamName == name);

        var teamDto = new TeamInfoDto
        {
            City = team.TeamCity,
            Conference = team.Conference,
            Division = team.Division,
            ID = team.TeamAbv,
            Logo = team.NflComLogo1,
            Name = team.TeamName
        };

        return Task.FromResult(teamDto);
    }
}