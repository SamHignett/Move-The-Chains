using System.Text.Json.Serialization;

namespace Infrastructure.Clients.Player.Tank01;

public class Tank01PlayerInfoResponse
{
    [JsonPropertyName("statusCode")]
    public int StatusCode { get; init; }
    
    [JsonPropertyName("body")]
    public Tank01PlayerInfoDto Body { get; init; }
}