import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Request } from '@sherpa/shared'
import { getRequest } from '../../src/api/requests'
import { Row } from '../../src/components/ui'

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data: request, isLoading } = useQuery({
    queryKey: ['requests', id],
    queryFn: () => getRequest(id),
    initialData: () => {
      const data = queryClient.getQueryData<{ pages: Request[][] }>(['requests'])
      return data?.pages.flat().find(r => r.id === id)
    },
    initialDataUpdatedAt: () => queryClient.getQueryState(['requests'])?.dataUpdatedAt,
  })

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-row items-center px-4 pt-14 pb-4 border-b border-border">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-muted text-base">←</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold text-text flex-1" numberOfLines={1}>
          {isLoading ? '...' : (request?.title ?? 'Request')}
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator className="mt-16" />
      ) : !request ? (
        <View className="flex-1 items-center justify-center mt-16">
          <Text className="text-gray-400">Request not found</Text>
        </View>
      ) : (
        <View className="p-4 gap-4">
          {request.imageUrl && (
            <Image
              source={{ uri: request.imageUrl }}
              className="w-full h-56 rounded-xl"
              resizeMode="cover"
            />
          )}

          <View className="gap-1">
            <Text className="text-xl font-bold text-text">{request.title}</Text>
            {request.store && (
              <Text className="text-sm text-muted">{request.store}</Text>
            )}
          </View>

          {request.description && (
            <Text className="text-sm text-text leading-5">{request.description}</Text>
          )}

          <View className="bg-surface rounded-xl p-4 gap-3">
            <Row label="Price" value={`$${request.priceOriginal}`} />
            <Row label="Markup" value={`${request.markupPercent}%`} />
            <Row
              label="Buyer pays"
              value={`$${Math.round(request.priceOriginal * (1 + request.markupPercent / 100))}`}
              bold
            />
            <Row label="Category" value={request.category} />
            {request.size && <Row label="Size" value={request.size} />}
            {request.weight != null && <Row label="Weight" value={`${request.weight} kg`} />}
            {request.from && <Row label="From" value={request.from} />}
            <Row label="To" value={request.to} />
            <Row label="Delivery by" value={new Date(request.deliveryDate).toLocaleDateString()} />
          </View>
        </View>
      )}
    </ScrollView>
  )
}
