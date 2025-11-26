using System.Text.Json.Serialization;

namespace Infrastructure.Clients.Team.Tank01;

public class Tank01TeamScheduleResponse
{
    [JsonPropertyName("statusCode")]
    public int StatusCode { get; init; }
    
    [JsonPropertyName("body")]
    public Tank01TeamScheduleDto Body { get; init; } 
}