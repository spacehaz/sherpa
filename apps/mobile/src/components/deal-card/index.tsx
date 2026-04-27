import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { Card } from '../ui'
import { TProps } from './types'

export default function DealCard({ deal }: TProps) {
  const item = deal.offer ?? deal.request

  return (
    <TouchableOpacity onPress={() => router.push(`/deal/${deal.id}`)}>
      <Card>
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-base font-semibold text-gray-800 flex-1" numberOfLines={1}>
            {item?.title ?? 'Deal'}
          </Text>
          <Text className="text-xs text-gray-400 ml-2">{deal.status}</Text>
        </View>

        {item?.category && (
          <Text className="text-xs text-gray-400 mb-2">{item.category}</Text>
        )}

        {deal.agreedPrice && (
          <Text className="text-sm text-gray-600">${deal.agreedPrice}</Text>
        )}

        <Text className="text-xs text-gray-400 mt-1">
          {new Date(deal.createdAt).toLocaleDateString()}
        </Text>
      </Card>
    </TouchableOpacity>
  )
}