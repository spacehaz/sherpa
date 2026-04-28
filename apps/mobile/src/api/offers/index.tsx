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

export const createOffer: TCreateOffer = async (body) => {
  const { data } = await apiClient.post<Offer>('/offers', body)
  return data
}

export const deleteOffer = async (id: string): Promise<void> => {
  await apiClient.delete(`/offers/${id}`)
}



