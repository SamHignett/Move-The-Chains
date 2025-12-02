//Allow undici to ignore self-signed certificates in development environment (required for local testing with fetch)
if (globalThis.window === undefined && process.env.NODE_ENV === 'development') {
  import('undici').then(({ Agent, setGlobalDispatcher }) => {
    const agent = new Agent({
      connect: {
        rejectUnauthorized: false,
      },
    });
    setGlobalDispatcher(agent);
  });
}

/**
 * Fetches a resource and parses the response as JSON of type T.
 *
 * @template T - The expected response type (parsed JSON).
 * @param {string} url - The resource URL (relative or absolute).
 * @param {RequestInit} [options] - Standard fetch options.
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response.
 * @throws {Error} If the HTTP response is not OK, throws an error with status and URL information.
 */
export async function Fetch<T>(url: string, options?: RequestInit): Promise<T> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  url = baseURL ? `${baseURL}/${url}` : url;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
    cache: 'force-cache',
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} - URL: ${url}`);
  }

  return response.json();
}
