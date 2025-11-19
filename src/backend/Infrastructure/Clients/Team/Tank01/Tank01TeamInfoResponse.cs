using System.Text.Json.Serialization;

namespace Infrastructure.Clients.Team.Tank01
{
    public class Tank01TeamInfoResponse
    {
        [JsonPropertyName("statusCode")]
        public int StatusCode { get; init; }

        [JsonPropertyName("body")]
        public List<Tank01TeamDto> Body { get; init; } = [];
    }
}
