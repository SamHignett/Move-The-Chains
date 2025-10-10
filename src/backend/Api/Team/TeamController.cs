using Application.Commands.Team;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Team;

[ApiController]
[Route("api/[controller]")]
public class TeamController(IMediator mediator) : Controller
{
    [HttpGet("{name}/info")]
    public async Task<IActionResult> GetTeamInfo([FromRoute] string name)
    {
        var team = await mediator.Send(new GetTeamInfo.Command(name));

        return Ok(team);
    }
}