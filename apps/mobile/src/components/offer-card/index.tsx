import { View, Text } from 'react-native'
import { Card } from '../ui'
import { TProps } from './types'


export default function OfferCard({ offer }: TProps) {
  const buyerPrice = Math.round(offer.priceOriginal * (1 + offer.markupPercent / 100))

  return (
    <Card>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-base font-semibold text-gray-800 flex-1" numberOfLines={1}>
          {offer.title}
        </Text>
        <Text className="text-xs text-gray-400 ml-2">{offer.status}</Text>
      </View>

      {offer.store && (
        <Text className="text-xs text-gray-400 mb-2">{offer.store}</Text>
      )}

      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-gray-600">
          ${offer.priceOriginal} + {offer.markupPercent}% → ${buyerPrice}
        </Text>
        <Text className="text-xs text-gray-400">
          {new Date(offer.deliveryDate).toLocaleDateString()}
        </Text>
      </View>
    </Card>
  )
}