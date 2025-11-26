using Application.Interfaces;
using Application.Models.Team;
using MediatR;

namespace Application.Commands.Team;

public static class GetTeamInfo
{
    public class Command(string name, string id) : IRequest<TeamInfoDto>
    {
        internal string Name { get; set; } = name;
        
        internal string ID { get; set; } = id;
    }

    public class Handler(ITeamClient teamClient) : IRequestHandler<Command, TeamInfoDto>
    {
        public Task<TeamInfoDto> Handle(Command request, CancellationToken cancellationToken)
        {
            return teamClient.GetTeamInfo(request.Name, request.ID);
        }
    }
}