import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Offer } from '@sherpa/shared'
import { getOffer } from '../../src/api/offers'
import { Row } from '../../src/components/ui'

export default function OfferDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data: offer, isLoading } = useQuery({
    queryKey: ['offers', id],
    queryFn: () => getOffer(id),
    initialData: () => {
      const data = queryClient.getQueryData<{ pages: Offer[][] }>(['offers'])
      return data?.pages.flat().find(o => o.id === id)
    },
    initialDataUpdatedAt: () => queryClient.getQueryState(['offers'])?.dataUpdatedAt,
  })

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-row items-center px-4 pt-14 pb-4 border-b border-border">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-muted text-base">←</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold text-text flex-1" numberOfLines={1}>
          {isLoading ? '...' : (offer?.title ?? 'Offer')}
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator className="mt-16" />
      ) : !offer ? (
        <View className="flex-1 items-center justify-center mt-16">
          <Text className="text-gray-400">Offer not found</Text>
        </View>
      ) : (
        <View className="p-4 gap-4">
          {offer.imageUrl && (
            <Image
              source={{ uri: offer.imageUrl }}
              className="w-full h-56 rounded-xl"
              resizeMode="cover"
            />
          )}

          <View className="gap-1">
            <Text className="text-xl font-bold text-text">{offer.title}</Text>
            {offer.store && (
              <Text className="text-sm text-muted">{offer.store}</Text>
            )}
          </View>

          {offer.description && (
            <Text className="text-sm text-text leading-5">{offer.description}</Text>
          )}

          <View className="bg-surface rounded-xl p-4 gap-3">
            <Row label="Price" value={`$${offer.priceOriginal}`} />
            <Row label="Markup" value={`${offer.markupPercent}%`} />
            <Row
              label="Buyer pays"
              value={`$${Math.round(offer.priceOriginal * (1 + offer.markupPercent / 100))}`}
              bold
            />
            <Row label="Category" value={offer.category} />
            {offer.size && <Row label="Size" value={offer.size} />}
            {offer.weight != null && <Row label="Weight" value={`${offer.weight} kg`} />}
            <Row label="From" value={offer.from} />
            <Row label="To" value={offer.to} />
            <Row label="Delivery by" value={new Date(offer.deliveryDate).toLocaleDateString()} />
          </View>
        </View>
      )}
    </ScrollView>
  )
}
