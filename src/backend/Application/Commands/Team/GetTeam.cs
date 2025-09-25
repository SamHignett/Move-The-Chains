using Application.Interfaces;
using MediatR;

namespace Application.Commands.Team;

public static class GetTeam
{
    public class Command(string name) : IRequest<Domain.Entities.Team>
    {
        internal string Name { get; set; } = name;
    }

    public class Handler : IRequestHandler<Command, Domain.Entities.Team>
    {
        private readonly ITeamClient teamClient;
        
        public Task<Domain.Entities.Team> Handle(Command request, CancellationToken cancellationToken)
        {
            return teamClient.GetTeam(request.Name);
        }
    }
}