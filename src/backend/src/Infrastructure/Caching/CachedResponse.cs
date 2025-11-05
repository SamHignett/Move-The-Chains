using System.Net;

namespace Infrastructure.Caching;

class CachedResponse : HttpContent
{
    private readonly byte[] buffer;

    class CachedResponseMemoryStream(byte[] buffer) : MemoryStream(buffer)
    {
        private void Reset()
        {
            Position = 0;
        }

        protected override void Dispose(bool disposing)
        {
            Reset();
        }

        public override ValueTask DisposeAsync()
        {
            Reset();
            return ValueTask.CompletedTask;
        }
    }

    public CachedResponse(HttpContent content)
    {
        ArgumentNullException.ThrowIfNull(content, nameof(content));

        buffer = content.ReadAsByteArrayAsync().ConfigureAwait(false).GetAwaiter().GetResult();

        foreach (var headers in content.Headers)
        {
            Headers.TryAddWithoutValidation(headers.Key, headers.Value);
        }
    }

    protected override void Dispose(bool disposing)
    {
    }

    protected async Task CopyToStreamAsync(Stream stream)
    {
        await stream.WriteAsync(buffer, 0, buffer.Length);
    }

    protected override async Task SerializeToStreamAsync(Stream stream, TransportContext? context)
    {
        await CopyToStreamAsync(stream);
    }

    protected override bool TryComputeLength(out long length)
    {
        length = buffer.Length;
        return true;
    }

    protected override Task<Stream> CreateContentReadStreamAsync()
    {
        return Task.FromResult<Stream>(new CachedResponseMemoryStream(buffer));
    }
}