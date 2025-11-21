namespace Application.Models.Team;

public class GameDto
{
    public string ID { get; set; }
    
    public string Type { get; set; }
    
    public string GameWeek { get; set; }
    
    public string HomeTeamID { get; set; }
    
    public string HomeTeamName { get; set; }
    
    public string AwayTeamID { get; set; }
    
    public string AwayTeamName { get; set; }
    
    public string Date { get; set; }
    
    public string Time { get; set; }
    
    public string Status { get; set; }
    
    public string HomePoints { get; set; }
    
    public string AwayPoints { get; set; }
}