namespace Application.Models.Team;

public class TeamInfoDto
{
    public string ID { get; set; }

    public string Name { get; set; }

    public string City { get; set; }

    public string Conference { get; set; }

    public string Division { get; set; }

    public string Logo { get; set; }

    public int Wins { get; set; }

    public int Losses { get; set; }

    public int Ties { get; set; }
}