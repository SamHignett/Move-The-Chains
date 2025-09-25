using Domain.Entities;

namespace Application.Interfaces;

public interface ITeamClient
{
    Task<Team> GetTeam(string name);
}