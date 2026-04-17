import { FlatList, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useOffersInfinite } from '../../src/hooks/use-offers'
import { OfferCard } from '../../src/components'

export default function MyOffersScreen() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useOffersInfinite()
  const items = data?.pages.flat() ?? []

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
        renderItem={({ item }) => <OfferCard offer={item} />}
        onEndReached={() => { if (hasNextPage) fetchNextPage() }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator className="py-4" /> : null}
        contentContainerStyle={{ padding: 16 }}
      />
      <TouchableOpacity className="absolute bottom-6 right-6 bg-gray-800 px-5 py-3 rounded-xl">
        <Text className="text-white font-semibold">+ New offer</Text>
      </TouchableOpacity>
    </View>
  )
}
