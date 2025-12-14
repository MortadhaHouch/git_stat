export interface FetchOptions extends RequestInit {
  signal?: AbortSignal;
}

export default async function fetchData<T = any>(
  url: string, 
  options: FetchOptions = { method: 'GET' }
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}