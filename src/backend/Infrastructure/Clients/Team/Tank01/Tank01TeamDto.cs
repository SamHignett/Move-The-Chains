using System.Text.Json.Serialization;

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
    }
}
