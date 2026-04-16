import { User } from "@sherpa/shared"
import { apiClient } from "../client"
import { TGetMe } from "./types/get-me"

export const getMe: TGetMe = async () => {
  const { data } = await apiClient.get<User>('/users/me')
  return data
}