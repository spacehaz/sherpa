import { User, Rating } from "@sherpa/shared"
import { apiClient } from "../client"
import { TGetMe } from "./types/get-me"

export const getMe: TGetMe = async () => {
  const { data } = await apiClient.get<User>('/users/me')
  return data
}

export const updateMe = async (body: { name?: string; gender?: string; hometown?: string }): Promise<User> => {
  const { data } = await apiClient.patch<User>('/users/me', body)
  return data
}

export const getUserRatings = async (userId: string): Promise<Rating[]> => {
  const { data } = await apiClient.get<Rating[]>(`/ratings/user/${userId}`, {
    params: { limit: 50, property: 'createdAt', direction: 'desc' },
  })
  return data
}

export const createRating = async (body: { dealId: string; toUserId: string; score: number; comment?: string }): Promise<Rating> => {
  const { data } = await apiClient.post<Rating>('/ratings', body)
  return data
}