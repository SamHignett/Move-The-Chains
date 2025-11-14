using Application.Interfaces;
using Application.Models.Player;
using MediatR;

namespace Application.Commands.Player;

public static class GetPlayerInfo
{
    public class Command(string name, string ID) : IRequest<PlayerInfoDto>
    {
        internal string Name { get; set; } = name;
        internal string ID { get; set; } = ID;
    }

    public class Handler(IPlayerClient client) : IRequestHandler<Command, PlayerInfoDto>
    {
        public Task<PlayerInfoDto> Handle(Command request, CancellationToken cancellationToken)
        {
            return client.GetPlayerInfo(request.Name, request.ID);
        }
    }
}