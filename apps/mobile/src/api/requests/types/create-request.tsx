import { Request } from "@sherpa/shared"

export type TCreateRequestBody = {
  title: string
  category: string
  from?: string
  to: string
  priceOriginal: number
  markupPercent: number
  deliveryDate: string
  description?: string
  store?: string
  size?: string
  weight?: number
}

export type TCreateRequest = (body: TCreateRequestBody, imageUri?: string) => Promise<Request>