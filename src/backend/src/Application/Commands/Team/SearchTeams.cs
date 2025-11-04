using Application.Interfaces;
using Application.Models.Team;
using MediatR;

namespace Application.Commands.Team;

public static class SearchTeams
{
    public class Command(string searchTerm) : IRequest<TeamInfoDto[]>
    {
        internal string SearchTerm { get; set; } = searchTerm;
    }

    public class Handler(ITeamClient teamClient) : IRequestHandler<Command, TeamInfoDto[]>
    {
        public Task<TeamInfoDto[]> Handle(Command request, CancellationToken cancellationToken)
        {
            return teamClient.SearchTeams(request.SearchTerm);
        }
    }
}