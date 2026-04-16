import { Request, RequestStatus } from "@sherpa/shared"

export type TGetRequestsParams = {
  page?: number
  limit?: number
  status?: RequestStatus
}

export type TGetRequests = (params: TGetRequestsParams) => Promise<Request[]>