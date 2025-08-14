const BASE_URL = import.meta.env.VITE_API_BASE ?? 'https://frontend-test-assignment-api.abz.agency/api/v1'

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { ...init })
  if (!res.ok) throw new Error(await res.text())
  return res.json() as Promise<T>
}
