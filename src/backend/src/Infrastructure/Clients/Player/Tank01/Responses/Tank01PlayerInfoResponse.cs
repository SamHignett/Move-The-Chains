using System.Text.Json.Serialization;
using Infrastructure.Clients.Player.Tank01.Models;

namespace Infrastructure.Clients.Player.Tank01.Responses;

public class Tank01PlayerInfoResponse
{
    [JsonPropertyName("statusCode")]
    public int StatusCode { get; init; }
    
    [JsonPropertyName("body")]
    public List<Tank01PlayerInfoDto> Body { get; init; }
}

public class Tank01SinglePlayerInfoResponse
{
    [JsonPropertyName("statusCode")]
    public int StatusCode { get; init; }
    
    [JsonPropertyName("body")]
    public Tank01PlayerInfoDto Body { get; init; }
}