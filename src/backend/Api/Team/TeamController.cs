using Application.Commands.Team;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MoveTheChains.Api.Team;

[ApiController]
[Route("api/[controller]")]
public class TeamController(IMediator mediator, IMapper mapper) : Controller
{
    [HttpGet("{name}")]
    public async Task<IActionResult> Get([FromRoute] string name)
    {
        var team = await mediator.Send(new GetTeam.Command(name));

        return Ok(mapper.Map<Domain.Entities.Team, TeamDto>(team));
    }
}