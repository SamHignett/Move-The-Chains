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

        var teams = JsonSerializer.Deserialize<Tank01TeamInfoResponse>(response.Content.ReadAsStringAsync().Result)?.body;

        if (teams == null || teams.Count == 0)
            throw new Exception("No teams found");

        var team = teams.First(x => x.Name == name);

        var teamDto = new TeamInfoDto
        {
            City = team.TeamCity,
            Conference = team.Conference,
            Division = team.Division,
            Logo = team.NflComLogo1,
            Name = team.Name,
            Wins = team.Wins,
            Losses = team.Losses,
            Ties = team.Ties,
        };

        return Task.FromResult(teamDto);
    }
}