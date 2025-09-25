using System.Text.Json;
using Application.Interfaces;
using AutoMapper;

namespace Infrastructure.Clients.Team.Tank01;

public class Tank01TeamClient (IMapper mapper) : ITeamClient
{
    private HttpClient httpClient = new()
    {
        BaseAddress = new Uri("https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com"),
    };

    public Task<Domain.Entities.Team> GetTeam(string name)
    {
        using HttpResponseMessage response = httpClient.GetAsync($"getNFLTeams").Result;
        response.EnsureSuccessStatusCode();
        
        var teams = JsonSerializer.Deserialize<Tank01TeamDto[]>(response.Content.ReadAsStringAsync().Result);
        if (teams == null || teams.Length == 0)
            throw new Exception("No teams found");
        
        var team = teams.First(x => x.TeamName == name);
        
        return Task.FromResult(mapper.Map<Domain.Entities.Team>(team));
    }
}