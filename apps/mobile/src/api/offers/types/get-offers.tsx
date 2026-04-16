import { Offer, OfferStatus } from "@sherpa/shared"

export type TGetOffersParams = {
  page?: number
  limit?: number
  status?: OfferStatus
}

export type TGetOffers = (params: TGetOffersParams) => Promise<Offer[]>