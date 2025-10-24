using System.Text.Json.Serialization;

namespace Infrastructure.Clients.Player.Tank01;

public class Tank01PlayerInfoDto
{
    [JsonPropertyName("espnName")] 
    public string PlayerName { get; set; }
    
    [JsonPropertyName("team")]
    public string Team { get; set; }
}