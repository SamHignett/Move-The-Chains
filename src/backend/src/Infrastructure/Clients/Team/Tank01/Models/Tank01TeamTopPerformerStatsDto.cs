using System.Text.Json.Serialization;

namespace Infrastructure.Clients.Team.Tank01.Models;

public class Tank01TeamTopPerformerStat
{
    [JsonPropertyName("total")]
    public string Value { get; set; }

    [JsonPropertyName("playerID")] 
    public string[] PlayerIDs { get; set; }

}

public class Tank01TeamTopPerformers
{
    [JsonPropertyName("Rushing")]
    public Tank01TeamTopPerformersRushing Rushing { get; set; }
    
    [JsonPropertyName("Kicking")]
    public Tank01TeamTopPerformersKicking Kicking { get; set; }
    
    [JsonPropertyName("Passing")]
    public Tank01TeamTopPeformersPassing Passing { get; set; }
    
    [JsonPropertyName("Receiving")]
    public Tank01TeamTopPerformersReceiving Receiving { get; set; }
    
    [JsonPropertyName("Punting")]
    public Tank01TeamTopPerformersPunting Punting { get; set; }
 
    [JsonPropertyName("Defense")]
    public Tank01TeamTopPerformersDefense Defense { get; set; }
}

public class Tank01TeamTopPerformersRushing
{
    [JsonPropertyName("rushYds")]
    public Tank01TeamTopPerformerStat Yards { get; set; }
    
    [JsonPropertyName("rushTD")]
    public Tank01TeamTopPerformerStat Touchdowns { get; set; }
    
    [JsonPropertyName("carries")]
    public Tank01TeamTopPerformerStat Carries { get; set; }
}

public class Tank01TeamTopPerformersKicking
{
    [JsonPropertyName("fgAttempts")]
    public Tank01TeamTopPerformerStat FieldGoalsAttempted { get; set; }
    
    [JsonPropertyName("fgMade")]
    public Tank01TeamTopPerformerStat FieldGoalsMade { get; set; }
    
    [JsonPropertyName("xpAttempts")]
    public Tank01TeamTopPerformerStat ExtraPointsAttempted { get; set; }
    
    [JsonPropertyName("xpMade")]
    public Tank01TeamTopPerformerStat ExtraPointsMade { get; set; }
}

public class Tank01TeamTopPeformersPassing
{
    [JsonPropertyName("passYds")]
    public Tank01TeamTopPerformerStat Yards { get; set; }
    
    [JsonPropertyName("passTD")]
    public Tank01TeamTopPerformerStat Touchdowns { get; set; }
    
    [JsonPropertyName("passCompletions")]
    public Tank01TeamTopPerformerStat Completions { get; set; }
    
    [JsonPropertyName("int")]
    public Tank01TeamTopPerformerStat Interceptions { get; set; }
    
    [JsonPropertyName("passAttempts")]
    public Tank01TeamTopPerformerStat Attempts { get; set; }
}

public class Tank01TeamTopPerformersReceiving
{
    [JsonPropertyName("recYds")]
    public Tank01TeamTopPerformerStat Yards { get; set; }
    
    [JsonPropertyName("recTD")]
    public Tank01TeamTopPerformerStat Touchdowns { get; set; }
    
    [JsonPropertyName("targets")]
    public Tank01TeamTopPerformerStat Targets { get; set; }
    
    [JsonPropertyName("receptions")]
    public Tank01TeamTopPerformerStat Receptions { get; set; }
}


public class Tank01TeamTopPerformersPunting
{
    [JsonPropertyName("punts")]
    public Tank01TeamTopPerformerStat Punts { get; set; }
    
    [JsonPropertyName("puntYds")]
    public Tank01TeamTopPerformerStat Yards { get; set; }
    
    [JsonPropertyName("puntsin20")]
    public Tank01TeamTopPerformerStat PuntsInside20 { get; set; }
}

public class Tank01TeamTopPerformersDefense
{
    [JsonPropertyName("totalTackles")]
    public Tank01TeamTopPerformerStat TotalTackles { get; set; }
    
    [JsonPropertyName("fumblesLost")]
    public Tank01TeamTopPerformerStat FumblesLost { get; set; }
    
    [JsonPropertyName("fumbles")]
    public Tank01TeamTopPerformerStat Fumbles { get; set; }
    
    [JsonPropertyName("fumblesRecovered")]
    public Tank01TeamTopPerformerStat FumblesRecovered { get; set; }
    
    [JsonPropertyName("soloTackles")]
    public Tank01TeamTopPerformerStat SoloTackles { get; set; }
    
    [JsonPropertyName("tfl")]
    public Tank01TeamTopPerformerStat TacklesForLoss { get; set; }
    
    [JsonPropertyName("passDeflections")]
    public Tank01TeamTopPerformerStat PassesDeflected { get; set; }
    
    [JsonPropertyName("defTD")]
    public Tank01TeamTopPerformerStat DefensiveTouchdowns { get; set; }
    
    [JsonPropertyName("sacks")]
    public Tank01TeamTopPerformerStat Sacks { get; set; }
    
    [JsonPropertyName("qbHits")]
    public Tank01TeamTopPerformerStat QbHits { get; set; }
    
    [JsonPropertyName("defensiveInterceptions")]
    public Tank01TeamTopPerformerStat Interceptions { get; set; }

}