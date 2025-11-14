namespace Application.Models.Stats;

public class Stat
{
    public double Value { get; set; }

    public string Id { get; set; } = "";
}

public class OffensiveStats
{
    public RushingStats Rushing { get; set; }
    public PassingStats Passing { get; set; }
    public KickingStats Kicking { get; set; }
    public PuntingStats Punting { get; set; }
    public ReceivingStats Receiving { get; set; }
    
    public FumblingStats Fumbling { get; set; }
}

public class RushingStats
{
    public Stat Yards { get; set; }
    public Stat Touchdowns { get; set; }
    public Stat Carries { get; set; }
}

public class PassingStats
{
    public Stat Attempts { get; set; }
    public Stat Yards { get; set; }
    public Stat Touchdowns { get; set; }
    public Stat Completions { get; set; }
    public Stat Interceptions { get; set; }
}

public class KickingStats
{
    public Stat FieldGoalsMade { get; set; }
    public Stat FieldGoalsAttempted { get; set; }
    public Stat ExtraPointsMade { get; set; }
    public Stat ExtraPointsAttempted { get; set; }
}

public class PuntingStats
{
    public Stat Punts { get; set; }
    public Stat Yards { get; set; }
    public Stat AverageYards { get; set; }
    public Stat PuntsInside20 { get; set; }
}

public class ReceivingStats
{
    public Stat Receptions { get; set; }
    public Stat Yards { get; set; }
    public Stat Targets { get; set; }
    public Stat Touchdowns { get; set; }
}



public class FumblingStats
{
    public Stat Fumbles { get; set; }
    public Stat FumblesLost { get; set; }
    public Stat FumblesRecovered { get; set; }
}

public class TeamDefensiveStats
{
    public Stat FumblesRecovered { get; set; }
    public Stat Sacks { get; set; }
    public Stat QbHits { get; set; }
    public Stat Interceptions { get; set; }
    public Stat PassingYardsAllowed { get; set; }
    public Stat PassingTDsAllowed { get; set; }
    public Stat RushingYardsAllowed { get; set; }
    public Stat RushingTDsAllowed { get; set; }
}

public class PlayerDefensiveStats
{
    public Stat FumblesRecovered { get; set; }
    public Stat Sacks { get; set; }
    public Stat QbHits { get; set; }
    public Stat Interceptions { get; set; }
    public Stat Tackles { get; set; }
    public Stat SoloTackles { get; set; }
    public Stat TacklesForLoss { get; set; }
    public Stat PassesDeflected { get; set; }
    public Stat DefensiveTouchdowns { get; set; }
}