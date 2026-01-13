using System.Text.Json.Serialization;

namespace Infrastructure.Clients.Player.Tank01.Models;

public class Tank01PlayerStatsDto
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
    public string Yards { get; set; }
    
    [JsonPropertyName("rushTD")]
    public string Touchdowns { get; set; }
    
    [JsonPropertyName("carries")]
    public string Carries { get; set; }
}

public class Tank01PlayerKickingStats
{
    [JsonPropertyName("fgAttempts")]
    public string FieldGoalsAttempted { get; set; }
    
    [JsonPropertyName("fgMade")]
    public string FieldGoalsMade { get; set; }
    
    [JsonPropertyName("xpAttempts")]
    public string ExtraPointsAttempted { get; set; }
    
    [JsonPropertyName("xpMade")]
    public string ExtraPointsMade { get; set; }
}

public class Tank01PlayerPassingStats
{
    [JsonPropertyName("passYds")]
    public string Yards { get; set; }
    
    [JsonPropertyName("passTD")]
    public string Touchdowns { get; set; }
    
    [JsonPropertyName("passCompletions")]
    public string Completions { get; set; }
    
    [JsonPropertyName("int")]
    public string Interceptions { get; set; }
    
    [JsonPropertyName("passAttempts")]
    public string Attempts { get; set; }
}

public class Tank01PlayerReceivingStats
{
    [JsonPropertyName("recYds")]
    public string Yards { get; set; }
    
    [JsonPropertyName("recTD")]
    public string Touchdowns { get; set; }
    
    [JsonPropertyName("targets")]
    public string Targets { get; set; }
    
    [JsonPropertyName("receptions")]
    public string Receptions { get; set; }
}


public class Tank01PlayerPuntingStats
{
    [JsonPropertyName("punts")]
    public string Punts { get; set; }
    
    [JsonPropertyName("puntYds")]
    public string Yards { get; set; }
    
    [JsonPropertyName("puntsin20")]
    public string PuntsInside20 { get; set; }
}

public class Tank01PlayerDefensiveStats
{
    [JsonPropertyName("fumblesLost")]
    public string FumblesLost { get; set; }
    
    [JsonPropertyName("fumbles")]
    public string Fumbles { get; set; }
    
    [JsonPropertyName("fumblesRecovered")]
    public string FumblesRecovered { get; set; }
    
    [JsonPropertyName("totalTackles")]
    public string TotalTackles { get; set; }
    
    [JsonPropertyName("soloTackles")]
    public string SoloTackles { get; set; }
    
    [JsonPropertyName("tfl")]
    public string TFL { get; set; }
    
    [JsonPropertyName("sacks")]
    public string Sacks { get; set; }
    
    [JsonPropertyName("qbHits")]
    public string QbHits { get; set; }
    
    [JsonPropertyName("defTD")]
    public string DefensiveTouchdowns { get; set; }
    
    [JsonPropertyName("defensiveInterceptions")]
    public string Interceptions { get; set; }
    
    [JsonPropertyName("passDeflections")]
    public string PassDeflections { get; set; }
    
    [JsonPropertyName("passingYardsAllowed")]
    public string PassingYardsAllowed { get; set; }
    
    [JsonPropertyName("passingTDAllowed")]
    public string PassingTDsAllowed { get; set; }
    
    [JsonPropertyName("rushingYardsAllowed")]
    public string RushingYardsAllowed { get; set; }
    
    [JsonPropertyName("rushingTDAllowed")]
    public string RushingTDsAllowed { get; set; }
}