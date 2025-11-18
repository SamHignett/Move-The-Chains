using Application.Interfaces;
using Application.Models.Team;
using MediatR;

namespace Application.Commands.Team;

public static class GetTeams
{
    public class Command(string name, string sortBy) : IRequest<TeamInfoDto[]>
    {
        internal string Name { get; set; } = name;
        internal string SortBy { get; set; } = sortBy;
    }

    public class Handler(ITeamClient teamClient) : IRequestHandler<Command, TeamInfoDto[]>
    {
        public Task<TeamInfoDto[]> Handle(Command request, CancellationToken cancellationToken)
        {
            return teamClient.GetTeams(request.Name, request.SortBy);
        }
    }
}