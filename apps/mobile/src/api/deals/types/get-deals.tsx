import { Deal, DealStatus } from "@sherpa/shared"

export type TGetDealsParams = {
  page?: number
  limit?: number
  status?: DealStatus
}

export type TGetMyDeals = (params: TGetDealsParams) => Promise<Deal[]>