using System.Text.Json.Serialization;

namespace Infrastructure.Clients.Player.Tank01;

public class Tank01PlayerInfoDto
{
    [JsonPropertyName("espnName")] 
    public string PlayerName { get; set; }
    
    [JsonPropertyName("age")]
    public string Age { get; set; }
    
    [JsonPropertyName("height")]
    public string Height { get; set; }
    
    [JsonPropertyName("weight")]
    public string Weight { get; set; }
    
    [JsonPropertyName("school")]
    public string School { get; set; }
    
    [JsonPropertyName("team")]
    public string Team { get; set; }
    
    [JsonPropertyName("pos")]
    public string Position { get; set; }
    
    [JsonPropertyName("espnHeadshot")]
    public string HeadshotImageUrl { get; set; }
}