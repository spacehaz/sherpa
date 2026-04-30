import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { Card, Button } from '../ui'
import { TProps } from './types'

export default function DealCard({ deal }: TProps) {
  const item = deal.offer ?? deal.request
  const itemRoute = deal.offerId ? `/offer/${deal.offerId}` : `/request/${deal.requestId}`

  return (
    <Card>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-base font-semibold text-text flex-1" numberOfLines={1}>
          {item?.title ?? 'Deal'}
        </Text>
        <Text className="text-xs text-muted ml-2">{deal.status}</Text>
      </View>

      {item?.category && (
        <Text className="text-xs text-muted mb-2">{item.category}</Text>
      )}

      {deal.agreedPrice && (
        <Text className="text-sm text-text mb-2">${deal.agreedPrice}</Text>
      )}

      <Text className="text-xs text-muted mb-3">
        {new Date(deal.createdAt).toLocaleDateString()}
      </Text>

      <View className="flex-row gap-2">
        <View className="flex-1">
          <Button title="Messages" onPress={() => router.push(`/deal/${deal.id}`)} />
        </View>
        <View className="flex-1">
          <Button title="Open" variant="secondary" onPress={() => router.push(itemRoute as any)} />
        </View>
      </View>
    </Card>
  )
}