using Application.Interfaces;
using Application.Models.Team;
using MediatR;

namespace Application.Commands.Team;

public static class GetTeamInfo
{
    public class Command(string name) : IRequest<TeamInfoDto>
    {
        internal string Name { get; set; } = name;
    }

    public class Handler(ITeamClient teamClient) : IRequestHandler<Command, TeamInfoDto>
    {
        public Task<TeamInfoDto> Handle(Command request, CancellationToken cancellationToken)
        {
            return teamClient.GetTeamInfo(request.Name);
        }
    }
}