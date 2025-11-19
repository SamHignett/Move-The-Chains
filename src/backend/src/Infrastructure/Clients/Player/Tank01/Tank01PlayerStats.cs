using System.Text.Json.Serialization;

namespace Infrastructure.Clients.Player.Tank01;

public class Tank01PlayerStat
{
    [JsonPropertyName("total")]
    public string Value { get; set; }

    [JsonPropertyName("playerID")] 
    public string[] PlayerIDs { get; set; }

}

public class Tank01PlayerStats
{
    [JsonPropertyName("Rushing")]
    public Tank01PlayerRushingStats Rushing { get; set; }
    
    [JsonPropertyName("Kicking")]
    public Tank01PlayerKickingStats Kicking { get; set; }
    
    [JsonPropertyName("Passing")]
    public Tank01PlayerPassingStats Passing { get; set; }
    
    [JsonPropertyName("Receiving")]
    public Tank01PlayerReceivingStats Receiving { get; set; }
    
    [JsonPropertyName("Punting")]
    public Tank01PlayerPuntingStats Punting { get; set; }
 
    [JsonPropertyName("Defense")]
    public Tank01PlayerDefensiveStats Defensive { get; set; }
}

public class Tank01PlayerRushingStats
{
    [JsonPropertyName("rushYds")]
    public Tank01PlayerStat Yards { get; set; }
    
    [JsonPropertyName("rushTD")]
    public Tank01PlayerStat Touchdowns { get; set; }
    
    [JsonPropertyName("carries")]
    public Tank01PlayerStat Carries { get; set; }
}

public class Tank01PlayerKickingStats
{
    [JsonPropertyName("fgAttempts")]
    public Tank01PlayerStat FieldGoalsAttempted { get; set; }
    
    [JsonPropertyName("fgMade")]
    public Tank01PlayerStat FieldGoalsMade { get; set; }
    
    [JsonPropertyName("xpAttempts")]
    public Tank01PlayerStat ExtraPointsAttempted { get; set; }
    
    [JsonPropertyName("xpMade")]
    public Tank01PlayerStat ExtraPointsMade { get; set; }
}

public class Tank01PlayerPassingStats
{
    [JsonPropertyName("passYds")]
    public Tank01PlayerStat Yards { get; set; }
    
    [JsonPropertyName("passTD")]
    public Tank01PlayerStat Touchdowns { get; set; }
    
    [JsonPropertyName("passCompletions")]
    public Tank01PlayerStat Completions { get; set; }
    
    [JsonPropertyName("int")]
    public Tank01PlayerStat Interceptions { get; set; }
    
    [JsonPropertyName("passAttempts")]
    public Tank01PlayerStat Attempts { get; set; }
}

public class Tank01PlayerReceivingStats
{
    [JsonPropertyName("recYds")]
    public Tank01PlayerStat Yards { get; set; }
    
    [JsonPropertyName("recTD")]
    public Tank01PlayerStat Touchdowns { get; set; }
    
    [JsonPropertyName("targets")]
    public Tank01PlayerStat Targets { get; set; }
    
    [JsonPropertyName("receptions")]
    public Tank01PlayerStat Receptions { get; set; }
}


public class Tank01PlayerPuntingStats
{
    [JsonPropertyName("punts")]
    public Tank01PlayerStat Punts { get; set; }
    
    [JsonPropertyName("puntYds")]
    public Tank01PlayerStat Yards { get; set; }
    
    [JsonPropertyName("puntsin20")]
    public Tank01PlayerStat PuntsInside20 { get; set; }
}

public class Tank01PlayerDefensiveStats
{
    [JsonPropertyName("totalTackles")]
    public Tank01PlayerStat TotalTackles { get; set; }
    
    [JsonPropertyName("fumblesLost")]
    public Tank01PlayerStat FumblesLost { get; set; }
    
    [JsonPropertyName("fumbles")]
    public Tank01PlayerStat Fumbles { get; set; }
    
    [JsonPropertyName("fumblesRecovered")]
    public Tank01PlayerStat FumblesRecovered { get; set; }
    
    [JsonPropertyName("soloTackles")]
    public Tank01PlayerStat SoloTackles { get; set; }
    
    [JsonPropertyName("tfl")]
    public Tank01PlayerStat TacklesForLoss { get; set; }
    
    [JsonPropertyName("passDeflections")]
    public Tank01PlayerStat PassesDeflected { get; set; }
    
    [JsonPropertyName("defTD")]
    public Tank01PlayerStat DefensiveTouchdowns { get; set; }
    
    [JsonPropertyName("sacks")]
    public Tank01PlayerStat Sacks { get; set; }
    
    [JsonPropertyName("qbHits")]
    public Tank01PlayerStat QbHits { get; set; }
    
    [JsonPropertyName("defensiveInterceptions")]
    public Tank01PlayerStat Interceptions { get; set; }

}