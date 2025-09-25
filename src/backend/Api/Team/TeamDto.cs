namespace MoveTheChains.Api.Team;

public class TeamDto
{
    public string Id { get; set; }
    
    public string Name { get; set; }
    
    public string LogoUrl { get; set; }
    
    public string City { get; set; }
    
    public string Division { get; set; }
    
    public string Conference { get; set; }
    
    public string Wins { get; set; }
    
    public string Loss { get; set; }
    
    public string Tie { get; set; }

    public TeamDto(string id, string name, string logoUrl, string city, string division, string conference, string wins, string loss, string tie)
    {
        Id = id;
        Name = name;
        LogoUrl = logoUrl;
        City = city;
        Division = division;
        Conference = conference;
        Wins = wins;
        Loss = loss;
        Tie = tie;
    }
}