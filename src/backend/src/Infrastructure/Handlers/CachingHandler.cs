using Infrastructure.Caching;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Infrastructure.Handlers;

public class CachingHandler(IMemoryCache cache, ILogger<CachingHandler> logger) : DelegatingHandler
{
    private const int DefaultCacheDurationDays = 1;

    private readonly TimeSpan cacheDuration = TimeSpan.FromDays(DefaultCacheDurationDays);

    public CachingHandler(IMemoryCache cache, ILogger<CachingHandler> logger, TimeSpan duration) : this(cache, logger)
    {
        cacheDuration = duration;
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        if (request.Method == HttpMethod.Get && cache.TryGetValue(request.RequestUri!, out var response) && response is HttpResponseMessage res)
        {
            logger.LogInformation($"Getting response from cache for {request.RequestUri}"); 
        } 
        else
        {
            res = await base.SendAsync(request, cancellationToken);
            res.EnsureSuccessStatusCode();
            res.Content = new CachedResponse(res.Content);
            
            cache.Set(request.RequestUri!, res, DateTimeOffset.Now.Add(cacheDuration));
            logger.LogInformation($"Adding response for {request.RequestUri} to cache for {cacheDuration}");
        }

        return res; 
    }
}

