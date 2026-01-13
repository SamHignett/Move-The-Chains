using Application.Commands.Player;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Player;

[ApiController]
[Route("api/[controller]")]
public class PlayerController(IMediator mediator): Controller
{
    [HttpGet("info")]
    public async Task<IActionResult> GetPlayerInfo([FromQuery] string[]? names = null, [FromQuery] string[]? ids = null)
    {
        if ((names == null || names.Length == 0) && (ids == null || ids.Length == 0))
        {
            return BadRequest("Either 'names' or 'ids' must be provided.");
        }
        
        var player = await mediator.Send(new GetPlayerInfo.Command(names ?? [], ids ?? []));
        
        return Ok(player);
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetPlayerStats([FromQuery] string? name = null, [FromQuery] string? id = null)
    {
        if (string.IsNullOrEmpty(name) && string.IsNullOrEmpty(id))
        {
            return BadRequest("Either 'name' or 'id' must be provided.");
        }
        
        var stats = await mediator.Send(new GetPlayerStats.Command(name ?? string.Empty, id ?? string.Empty));

        return Ok(stats);
    }

    [HttpGet("search/{searchTerm}")]
    public async Task<IActionResult> SearchPlayers(string searchTerm)
    {
        var matchingPlayers = await mediator.Send(new SearchPlayers.Command(searchTerm));
        
        return Ok(matchingPlayers);
    }
}