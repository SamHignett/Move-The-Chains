using Application.Interfaces;
using Application.Models.Team;
using MediatR;

namespace Application.Commands.Team;

public static class GetTeamSchedule
{
    public class Command(string name, string season = "") : IRequest<ScheduleDto>
    {
        public string Name { get; set; } = name;
        
        public string Season { get; set; } = season;
    }

    public class Handler(ITeamClient teamClient) : IRequestHandler<Command, ScheduleDto>
    {
        public Task<ScheduleDto> Handle(Command request, CancellationToken cancellationToken)
        {
            return teamClient.GetTeamSchedule(request.Name, request.Season);
        }
    }
}