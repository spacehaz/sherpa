import { Request } from '@sherpa/shared'
import { apiClient } from '../client'
import { TGetRequests } from './types/get-requests'
import { TCreateRequest } from './types/create-request'

export const getRequests: TGetRequests = async (params) => {
  const { data } = await apiClient.get<Request[]>('/requests', { params })
  return data
}

export const getMyRequests: TGetRequests = async (params) => {
  const { data } = await apiClient.get<Request[]>('/requests/my', { params })
  return data
}

export const createRequest: TCreateRequest = async (body) => {
  const { data } = await apiClient.post<Request>('/requests', body)
  return data
}

export const deleteRequest = async (id: string): Promise<void> => {
  await apiClient.delete(`/requests/${id}`)
}
