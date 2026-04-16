import { Deal } from "@sherpa/shared"

export type TCreateDealBody = {
  offerId?: string
  requestId?: string
}

export type TCreateDeal = (body: TCreateDealBody) => Promise<Deal>