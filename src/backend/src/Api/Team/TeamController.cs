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

    [HttpGet("search/{searchTerm}")]
    public async Task<IActionResult> SearchTeams(string searchTerm)
    {
        var teams = await mediator.Send(new SearchTeams.Command(searchTerm));
        
        return Ok(teams);
    }
}