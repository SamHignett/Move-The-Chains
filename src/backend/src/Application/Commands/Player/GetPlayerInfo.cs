using Application.Interfaces;
using Application.Models.Player;
using MediatR;

namespace Application.Commands.Player;

public static class GetPlayerInfo
{
    public class Command(string[] names, string[] IDs) : IRequest<PlayerInfoDto[]>
    {
        internal string[] Names { get; set; } = names;
        internal string[] IDs { get; set; } = IDs;
    }

    public class Handler(IPlayerClient client) : IRequestHandler<Command, PlayerInfoDto[]>
    {
        public Task<PlayerInfoDto[]> Handle(Command request, CancellationToken cancellationToken)
        {
            return client.GetPlayerInfo(request.Names, request.IDs);
        }
    }
}