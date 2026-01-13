using System.Text.Json.Serialization;

namespace Infrastructure.Clients.Team.Tank01.Models;

public class Tank01GameDto
{
    [JsonPropertyName("gameID")]
    public string GameID { get; init; }
    
    [JsonPropertyName("seasonType")]
    public string SeasonType { get; init; }
    
    [JsonPropertyName("gameWeek")]
    public string GameWeek { get; init; }
    
    [JsonPropertyName("teamIDHome")]
    public string TeamIDHome { get; init; }
    
    [JsonPropertyName("teamIDAway")]
    public string TeamIDAway { get; init; }
    
    [JsonPropertyName("gameDate")]
    public string GameDate { get; init; }
    
    [JsonPropertyName("gameTime_epoch")]
    public string GameTimeEpoch { get; init; }
    
    [JsonPropertyName("gameStatus")]
    public string GameStatus { get; init; }
    
    [JsonPropertyName("homePts")]
    public string HomePts { get; init; }
    
    [JsonPropertyName("awayPts")]
    public string AwayPts { get; init; }
}