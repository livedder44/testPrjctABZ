import { api } from './clients'
import type { User } from '@/types/user'

export type UsersResponse = {
  success: boolean
  page: number
  total_pages: number
  total_users: number
  count: number
  links?: { next_url?: string | null; prev_url?: string | null }
  users: User[]
}

export function getUsers(page = 1, count = 6) {
  return api<UsersResponse>(`/users?page=${page}&count=${count}`)
}


const BASE = import.meta.env.VITE_API_BASE ?? 'https://frontend-test-assignment-api.abz.agency/api/v1'

export type Position = { id: number; name: string }
export type PositionsResponse = { success: boolean; positions: Position[] }

export async function getPositions() {
  const res = await fetch(`${BASE}/positions`)
  if (!res.ok) throw new Error('Failed to load positions')
  return res.json() as Promise<PositionsResponse>
}

export async function getToken() {
  const res = await fetch(`${BASE}/token`)
  if (!res.ok) throw new Error('Failed to get token')
  const data = await res.json()
  return data.token as string
}

export type PostUserBody = {
  name: string
  email: string
  phone: string
  position_id: number
  photo: File
}

export async function postUser(body: PostUserBody) {
  const token = await getToken()
  const fd = new FormData()
  fd.append('name', body.name)
  fd.append('email', body.email)
  fd.append('phone', body.phone)
  fd.append('position_id', String(body.position_id))
  fd.append('photo', body.photo)

  const res = await fetch(`${BASE}/users`, {
    method: 'POST',
    body: fd,
    headers: { Token: token },
  })
  const data = await res.json()
  if (!res.ok) {
    const msg = typeof data?.message === 'string' ? data.message : 'Failed to register'
    throw new Error(msg)
  }
  return data
}
