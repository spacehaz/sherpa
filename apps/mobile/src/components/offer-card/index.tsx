import { View, Text, Image } from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { Card, Button } from '../ui'
import { TProps } from './types'
import { createDeal } from '../../api/deals'
import { useAppSelector } from '../../store/hooks'

export default function OfferCard({ offer, onDelete }: TProps) {
  const queryClient = useQueryClient()
  const currentUserId = useAppSelector(state => state.auth.user?.id)
  const buyerPrice = Math.round(offer.priceOriginal * (1 + offer.markupPercent / 100))

  const { mutate, isPending } = useMutation({
    mutationFn: () => createDeal({ offerId: offer.id }),
    onSuccess: (deal) => {
      queryClient.invalidateQueries({ queryKey: ['deals', 'my'] })
      router.push(`/deal/${deal.id}`)
    },
  })

  return (
    <Card>
      {offer.imageUrl && (
        <Image
          source={{ uri: offer.imageUrl }}
          className="w-full h-40 rounded-lg mb-3"
          resizeMode="cover"
        />
      )}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-base font-semibold text-text flex-1" numberOfLines={1}>
          {offer.title}
        </Text>
        <Text className="text-xs text-muted ml-2">{offer.status}</Text>
      </View>

      {offer.store && (
        <Text className="text-xs text-muted mb-2">{offer.store}</Text>
      )}

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-sm text-text">
          ${offer.priceOriginal} + {offer.markupPercent}% → ${buyerPrice}
        </Text>
        <Text className="text-xs text-muted">
          {new Date(offer.deliveryDate).toLocaleDateString()}
        </Text>
      </View>

      {offer.userId !== currentUserId && (
        <View className="flex-row gap-2">
          <View className="flex-1">
            <Button title="Deal" onPress={() => mutate()} loading={isPending} />
          </View>
          <View className="flex-1">
            <Button title="Read" variant="secondary" onPress={() => router.push(`/offer/${offer.id}`)} />
          </View>
        </View>
      )}
      {onDelete && (
        <Button title="Delete" variant="secondary" onPress={onDelete} />
      )}
    </Card>
  )
}