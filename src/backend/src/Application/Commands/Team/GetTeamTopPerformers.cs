using Application.Interfaces;
using Application.Models.Team;
using MediatR;

namespace Application.Commands.Team;

public static class GetTeamTopPerformers
{
    public class Command(string? searchTerm) : IRequest<TeamTopPerformersDto[]>
    {
        internal string SearchTerm { get; } = searchTerm ?? "";
        
        public class Handler(ITeamClient client): IRequestHandler<Command, TeamTopPerformersDto[]>
        {
            public Task<TeamTopPerformersDto[]> Handle(Command request, CancellationToken cancellationToken)
            {
                return client.GetTopTeamPerformers(request.SearchTerm);
            }
        }
    }
}