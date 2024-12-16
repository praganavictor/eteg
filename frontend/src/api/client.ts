import { api } from '@/lib/axios'

export interface RegisterClientBody {
  name: string
  document: string
  email: string
  color: string
  observation: string
}

export async function registerClient(body: RegisterClientBody) {
  await api.post('/client', body)
}