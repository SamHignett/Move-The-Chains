using System.Text.Json.Serialization;

namespace Infrastructure.Clients.Team.Tank01.Models;

public class Tank01TeamScheduleDto
{
    [JsonPropertyName("team")]
    public string Team { get; init; }
    
    [JsonPropertyName("schedule")]
    public Tank01GameDto[] Schedule { get; init; }
}