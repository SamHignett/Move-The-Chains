using System.Text.Json.Serialization;
using Infrastructure.Clients.Team.Tank01.Models;

namespace Infrastructure.Clients.Team.Tank01.Responses;

public class Tank01TeamScheduleResponse
{
    [JsonPropertyName("statusCode")]
    public int StatusCode { get; init; }
    
    [JsonPropertyName("body")]
    public Tank01TeamScheduleDto Body { get; init; } 
}