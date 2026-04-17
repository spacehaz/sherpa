import { apiClient } from "./client"


interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  email: string
  password: string
  name: string
}

interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
  }
  accessToken: string
}


export const loginRequest = (payload: LoginPayload) => {
  return apiClient.post<AuthResponse>('/auth/login', payload)
}

export const registerRequest = (payload: RegisterPayload) => {
  return apiClient.post<AuthResponse>('/auth/register', payload)
}