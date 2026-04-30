import { View, Text, Image } from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { Card, Button } from '../ui'
import { TProps } from './types'
import { createDeal } from '../../api/deals'
import { useAppSelector } from '../../store/hooks'

export default function RequestCard({ request, onDelete }: TProps) {
  const queryClient = useQueryClient()
  const currentUserId = useAppSelector(state => state.auth.user?.id)
  const buyerPrice = Math.round(request.priceOriginal * (1 + request.markupPercent / 100))

  const { mutate, isPending } = useMutation({
    mutationFn: () => createDeal({ requestId: request.id }),
    onSuccess: (deal) => {
      queryClient.invalidateQueries({ queryKey: ['deals', 'my'] })
      router.push(`/deal/${deal.id}`)
    },
  })

  return (
    <Card>
      {request.imageUrl && (
        <Image
          source={{ uri: request.imageUrl }}
          className="w-full h-40 rounded-lg mb-3"
          resizeMode="cover"
        />
      )}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-base font-semibold text-text flex-1" numberOfLines={1}>
          {request.title}
        </Text>
        <Text className="text-xs text-muted ml-2">{request.status}</Text>
      </View>

      {request.store && (
        <Text className="text-xs text-muted mb-2">{request.store}</Text>
      )}

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-sm text-text">
          ${request.priceOriginal} + {request.markupPercent}% → ${buyerPrice}
        </Text>
        <Text className="text-xs text-muted">
          {new Date(request.deliveryDate).toLocaleDateString()}
        </Text>
      </View>

      {request.userId !== currentUserId && (
        <View className="flex-row gap-2">
          <View className="flex-1">
            <Button title="Deal" onPress={() => mutate()} loading={isPending} />
          </View>
          <View className="flex-1">
            <Button title="Read" variant="secondary" onPress={() => router.push(`/request/${request.id}`)} />
          </View>
        </View>
      )}
      {onDelete && (
        <Button title="Delete" variant="secondary" onPress={onDelete} />
      )}
    </Card>
  )
}