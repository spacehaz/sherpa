import { View, Text } from 'react-native'
import { Card } from '../ui'
import { TProps } from './types'

export default function RequestCard({ request }: TProps) {
  const buyerPrice = Math.round(request.priceOriginal * (1 + request.markupPercent / 100))

  return (
    <Card>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-base font-semibold text-gray-800 flex-1" numberOfLines={1}>
          {request.title}
        </Text>
        <Text className="text-xs text-gray-400 ml-2">{request.status}</Text>
      </View>

      {request.store && (
        <Text className="text-xs text-gray-400 mb-2">{request.store}</Text>
      )}

      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-gray-600">
          ${request.priceOriginal} + {request.markupPercent}% → ${buyerPrice}
        </Text>
        <Text className="text-xs text-gray-400">
          {new Date(request.deliveryDate).toLocaleDateString()}
        </Text>
      </View>
    </Card>
  )
}