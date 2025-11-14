using Application.Commands.Player;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Player;

[ApiController]
[Route("api/[controller]")]
public class PlayerController(IMediator mediator): Controller
{
    [HttpGet("info")]
    public async Task<IActionResult> GetPlayerInfo([FromQuery] string? name = "", [FromQuery] string? id = "")
    {
        var player = await mediator.Send(new GetPlayerInfo.Command(name, id));
        
        return Ok(player);
    }

    [HttpGet("search/{searchTerm}")]
    public async Task<IActionResult> SearchPlayers(string searchTerm)
    {
        var matchingPlayers = await mediator.Send(new SearchPlayers.Command(searchTerm));
        
        return Ok(matchingPlayers);
    }
}