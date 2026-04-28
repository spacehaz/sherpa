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

export const createRequest: TCreateRequest = async (body, imageUri?: string) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (value != null) formData.append(key, String(value))
  })
  if (imageUri) {
    const ext = imageUri.split('.').pop() ?? 'jpg'
    formData.append('image', { uri: imageUri, type: `image/${ext}`, name: `image.${ext}` } as any)
  }
  const { data } = await apiClient.post<Request>('/requests', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const deleteRequest = async (id: string): Promise<void> => {
  await apiClient.delete(`/requests/${id}`)
}
