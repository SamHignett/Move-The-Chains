using Application.Interfaces;
using Application.Models.Team;
using MediatR;

namespace Application.Commands.Team;

public static class GetTeamStats
{
    public class Command(string? searchTerm) : IRequest<TeamStatsDto[]>
    {
        internal string SearchTerm { get; } = searchTerm ?? "";
        
        public class Handler(ITeamClient client): IRequestHandler<Command, TeamStatsDto[]>
        {
            public Task<TeamStatsDto[]> Handle(Command request, CancellationToken cancellationToken)
            {
                return client.GetTeamStats(request.SearchTerm);
            }
        }
    }
}