namespace Application.Models.Team;

public class TeamStatsDto
{
    public string Name { get; set; } = "";
    
    public string LogoURL { get; set; } = "";
    public string PointsFor { get; set; } = "";
    
    public string PointsAgainst { get; set; } = "";
    
    public TeamOffensiveStats Offensive { get; set; }
    
    public TeamDefensiveStats Defensive { get; set; }
}

public class TeamOffensiveStats
{
    public TeamRushingStats Rushing { get; set; }
    public TeamPassingStats Passing { get; set; }
    public TeamKickingStats Kicking { get; set; }
    public TeamPuntingStats Punting { get; set; }
    
    public TeamFumblingStats Fumbling { get; set; }
}

public class TeamRushingStats
{
    public int Yards { get; set; }
    public int Touchdowns { get; set; }
    public int Carries { get; set; }
}

public class TeamPassingStats
{
    public int Attempts { get; set; }
    public int Yards { get; set; }
    public int Touchdowns { get; set; }
    public int Completions { get; set; }
    public int Interceptions { get; set; }
}

public class TeamKickingStats
{
    public int FieldGoalsMade { get; set; }
    public int FieldGoalsAttempted { get; set; }
    public int ExtraPointsMade { get; set; }
    public int ExtraPointsAttempted { get; set; }
}

public class TeamPuntingStats
{
    public int Punts { get; set; }
    public int Yards { get; set; }
    public double AverageYards { get; set; }
    public int PuntsInside20 { get; set; }
}

public class TeamFumblingStats
{
    public int Fumbles { get; set; }
    public int FumblesLost { get; set; }
    public int FumblesRecovered { get; set; }
}

public class TeamDefensiveStats
{
    public int FumblesRecovered { get; set; }
    public int Sacks { get; set; }
    public int QbHits { get; set; }
    public int Interceptions { get; set; }
    public int PassingYardsAllowed { get; set; }
    public int PassingTDsAllowed { get; set; }
    public int RushingYardsAllowed { get; set; }
    public int RushingTDsAllowed { get; set; }
}