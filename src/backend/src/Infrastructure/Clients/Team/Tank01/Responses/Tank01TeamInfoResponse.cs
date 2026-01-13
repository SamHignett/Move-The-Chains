using System.Text.Json.Serialization;
using Infrastructure.Clients.Team.Tank01.Models;

namespace Infrastructure.Clients.Team.Tank01.Responses
{
    public class Tank01TeamInfoResponse
    {
        [JsonPropertyName("statusCode")]
        public int StatusCode { get; init; }

        [JsonPropertyName("body")]
        public List<Tank01TeamDto> Body { get; init; } = [];
    }
}
