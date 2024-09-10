import got from 'got';

export async function makeGetRequest<T>(endpoint: string): Promise<T> {
  return got.get(process.env.BACKEND_API_BASE_URL + endpoint).json<T>();
}

export async function makePutRequest(endpoint: string, data: unknown): Promise<unknown> {
  return got.put(process.env.BACKEND_API_BASE_URL + endpoint, { json: data }).json();
}

export async function makePostRequest(endpoint: string, data: unknown): Promise<unknown> {
  return got.post(process.env.BACKEND_API_BASE_URL + endpoint, { json: data }).json();
}
