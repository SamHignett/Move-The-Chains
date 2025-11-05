using Infrastructure.Caching;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Handlers;

public class CachingHandler(IMemoryCache cache, ILogger<CachingHandler> logger) : DelegatingHandler
{
    private const int DefaultCacheDurationDays = 1;

    private readonly TimeSpan cacheDuration = TimeSpan.FromDays(DefaultCacheDurationDays);

    public CachingHandler(IMemoryCache cache, ILogger<CachingHandler> logger, TimeSpan duration) : this(cache, logger)
    {
        cacheDuration = duration;
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        if (request.Method != HttpMethod.Get)
            return await base.SendAsync(request, cancellationToken);

        if (cache.TryGetValue(request.RequestUri!, out var response) && response is CachedResponse cachedResponse)
        {
            logger.LogInformation("Getting response from cache for {RequestRequestUri}", request.RequestUri);
            return cachedResponse.ToHttpResponseMessage();
        }

        var res = await base.SendAsync(request, cancellationToken);
        
        if (res.IsSuccessStatusCode)
        {
            var cached = await CachedResponse.CreateAsync(res);

            cache.Set(request.RequestUri!, cached, DateTimeOffset.Now.Add(cacheDuration));
            logger.LogInformation("Adding response for {RequestRequestUri} to cache for {CacheDuration}",
                request.RequestUri, cacheDuration);

            return cached.ToHttpResponseMessage();
        }

        return res;
    }
}