using Application.Interfaces;
using Application.Models.Player;
using MediatR;

namespace Application.Commands.Player;

public static class SearchPlayers
{
    public class Command(string name) : IRequest<PlayerInfoDto[]>
    {
        internal string Name { get; set; } = name;
    }

    public class Handler(IPlayerClient client) : IRequestHandler<Command, PlayerInfoDto[]>
    {
        public Task<PlayerInfoDto[]> Handle(Command request, CancellationToken cancellationToken)
        {
            return client.SearchPlayers(request.Name);
        }
    }
}