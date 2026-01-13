using Application.Interfaces;
using Application.Models.Player;
using MediatR;

namespace Application.Commands.Player;

public class GetPlayerStats
{
    public class Command(string name, string id) : IRequest<PlayerStatsDto[]>
    {
        internal string Name { get; set; } = name;
        internal string ID { get; set; } = id;
    }

    public class Handler(IPlayerClient client) : IRequestHandler<Command, PlayerStatsDto[]>
    {
        public Task<PlayerStatsDto[]> Handle(Command request, CancellationToken cancellationToken)
        {
            return client.GetPlayerStats(request.Name, request.ID);
        }
    }
}