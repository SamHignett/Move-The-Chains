using System.Net;

namespace Infrastructure.Caching;

internal class CachedResponse(
    byte[] content,
    Dictionary<string, IEnumerable<string>> contentHeaders,
    Version version,
    HttpStatusCode statusCode,
    Dictionary<string, IEnumerable<string>> responseHeaders)
{
    public static async Task<CachedResponse> CreateAsync(HttpResponseMessage response)
    {
        var buffer = await response.Content.ReadAsByteArrayAsync();
        
        var responseHeaders = response.Headers.ToDictionary(h => h.Key, h => h.Value);
        
        var contentHeaders = response.Content.Headers.ToDictionary(h => h.Key, h => h.Value);
        
        return new CachedResponse(buffer, contentHeaders, response.Version, response.StatusCode, responseHeaders);
    }

    public HttpResponseMessage ToHttpResponseMessage()
    {
        var res = new HttpResponseMessage()
        {
            Content = new ByteArrayContent(content),
            Version = version,
            StatusCode = statusCode,
        };
        
        foreach (var (key, value) in responseHeaders)
            res.Headers.TryAddWithoutValidation(key, value);
        
        foreach (var (key, value) in contentHeaders)
            res.Content.Headers.TryAddWithoutValidation(key, value);

        return res;
    }
}