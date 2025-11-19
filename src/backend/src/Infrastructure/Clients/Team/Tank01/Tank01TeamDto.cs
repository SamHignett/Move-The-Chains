using System.Text.Json.Serialization;
using Infrastructure.Clients.Player.Tank01;

namespace Infrastructure.Clients.Team.Tank01
{
    public class Tank01TeamDto
    {
        [JsonPropertyName("teamName")]
        public string Name { get; set; }

        [JsonPropertyName("nflComLogo1")]
        public string NflComLogo1 { get; set; }

        [JsonPropertyName("teamCity")]
        public string TeamCity { get; set; }

        [JsonPropertyName("division")]
        public string Division { get; set; }

        [JsonPropertyName("conferenceAbv")]
        public string Conference { get; set; }

        [JsonPropertyName("wins")]
        public string Wins { get; set; }

        [JsonPropertyName("loss")]
        public string Losses { get; set; }

        [JsonPropertyName("tie")]
        public string Ties { get; set; }
        
        [JsonPropertyName("pf")]
        public string PointsFor { get; set; }
    
        [JsonPropertyName("pa")]
        public string PointsAgainst { get; set; }
        
        [JsonPropertyName("teamStats")]
        public Tank01TeamStats TeamStats { get; set; }
        
        [JsonPropertyName("topPerformers")]
        public Tank01PlayerStats TopPerformers { get; set; }
    }
}
