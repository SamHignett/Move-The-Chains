using Application.Commands.Player;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Player;

[ApiController]
[Route("api/[controller]")]
public class PlayerController(IMediator mediator): Controller
{
    [HttpGet("{name}/info")]
    public async Task<IActionResult> GetPlayerInfo([FromRoute] string name)
    {
        var player = await mediator.Send(new GetPlayerInfo.Command(name));
        
        return Ok(player);
    }

    [HttpGet("search/{searchTerm}")]
    public async Task<IActionResult> SearchTeams(string searchTerm)
    {
        var matchingPlayers = await mediator.Send(new SearchPlayers.Command(searchTerm));
        
        return Ok(matchingPlayers);
    }
}