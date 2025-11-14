using Application.Models.Stats;

namespace Application.Models.Team;

public class TeamTopPerformersDto
{
    public RushingStats Rushing { get; set; }
    public PassingStats Passing { get; set; }
    public KickingStats Kicking { get; set; }
    public PuntingStats Punting { get; set; }
    public ReceivingStats Receiving { get; set; }
    
    public PlayerDefensiveStats Defensive { get; set; }
}