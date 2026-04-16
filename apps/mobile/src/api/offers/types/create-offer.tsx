import { Offer } from "@sherpa/shared"

export type TCreateOfferBody = {
  title: string
  category: string
  priceOriginal: number
  markupPercent: number
  deliveryDate: string
  description?: string
  store?: string
  size?: string
  weight?: number
}

export type TCreateOffer = (body: TCreateOfferBody) => Promise<Offer>