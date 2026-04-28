import { View, Text } from 'react-native'
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
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-base font-semibold text-gray-800 flex-1" numberOfLines={1}>
          {request.title}
        </Text>
        <Text className="text-xs text-gray-400 ml-2">{request.status}</Text>
      </View>

      {request.store && (
        <Text className="text-xs text-gray-400 mb-2">{request.store}</Text>
      )}

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-sm text-gray-600">
          ${request.priceOriginal} + {request.markupPercent}% → ${buyerPrice}
        </Text>
        <Text className="text-xs text-gray-400">
          {new Date(request.deliveryDate).toLocaleDateString()}
        </Text>
      </View>

      {request.userId !== currentUserId && (
        <Button title="Deal" onPress={() => mutate()} loading={isPending} />
      )}
      {onDelete && (
        <Button title="Delete" variant="secondary" onPress={onDelete} />
      )}
    </Card>
  )
}