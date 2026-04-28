import { Offer } from '@sherpa/shared'
import { apiClient } from '../client'
import { TGetOffers } from './types/get-offers'
import { TCreateOffer } from './types/create-offer'

export const getOffers: TGetOffers = async (params) => {
  const { data } = await apiClient.get<Offer[]>('/offers', { params })
  return data
}

export const getMyOffers: TGetOffers = async (params) => {
  const { data } = await apiClient.get<Offer[]>('/offers/my', { params })
  return data
}

export const createOffer: TCreateOffer = async (body, imageUri?: string) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (value != null) formData.append(key, String(value))
  })
  if (imageUri) {
    const ext = imageUri.split('.').pop() ?? 'jpg'
    formData.append('image', { uri: imageUri, type: `image/${ext}`, name: `image.${ext}` } as any)
  }
  const { data } = await apiClient.post<Offer>('/offers', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const deleteOffer = async (id: string): Promise<void> => {
  await apiClient.delete(`/offers/${id}`)
}



