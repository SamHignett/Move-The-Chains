using Application.Models.Stats;

namespace Application.Models.Team;

public class TeamStatsDto
{
    public string Name { get; set; } = "";
    
    public string LogoURL { get; set; } = "";
    public string PointsFor { get; set; } = "";
    
    public string PointsAgainst { get; set; } = "";
    
    public OffensiveStats Offensive { get; set; }
    
    public TeamDefensiveStats Defensive { get; set; }
}