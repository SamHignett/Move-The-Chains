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

export async function Fetch<T>(url: string, options?: RequestInit): Promise<T> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  url = baseURL ? `${baseURL}/${url}` : url;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
