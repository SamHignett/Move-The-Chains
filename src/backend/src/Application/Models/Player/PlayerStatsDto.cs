using Application.Models.Stats;

namespace Application.Models.Player;

public class PlayerStatsDto
{
    public string ID { get; set; } = "";
    
    public string Name { get; set; } = "";
    
    public OffensiveStats Offensive { get; set; }
    
    public PlayerDefensiveStats Defensive { get; set; }
}