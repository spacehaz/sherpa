import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMyOffersInfinite } from '../../src/hooks/use-offers'
import { deleteOffer } from '../../src/api/offers'
import { OfferCard, CreateItemFab } from '../../src/components'

export default function MyOffersScreen() {
  const queryClient = useQueryClient()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useMyOffersInfinite()
  const items = data?.pages.flat() ?? []

  const { mutate: remove } = useMutation({
    mutationFn: deleteOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-offers'] })
      queryClient.invalidateQueries({ queryKey: ['offers'] })
    },
  })

  if (isLoading) return <ActivityIndicator className="flex-1" />
  if (isError) return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-gray-400">Failed to load</Text>
    </View>
  )

  return (
    <View className="flex-1">
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OfferCard offer={item} onDelete={() => remove(item.id)} />}
        onEndReached={() => { if (hasNextPage) fetchNextPage() }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator className="py-4" /> : null}
        contentContainerStyle={{ padding: 16 }}
      />
      <CreateItemFab type="offer" />
    </View>
  )
}
