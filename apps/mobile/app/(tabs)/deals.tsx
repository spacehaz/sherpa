import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import { useMyDealsInfinite } from '../../src/hooks/use-my-deals'
import { DealCard } from '../../src/components'

export default function DealsScreen() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useMyDealsInfinite()
  const items = data?.pages.flat() ?? []

  if (isLoading) return <ActivityIndicator className="flex-1" />
  if (isError) return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-gray-400">Failed to load deals</Text>
    </View>
  )

  return (
    <View className="flex-1">
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DealCard deal={item} />}
        onEndReached={() => { if (hasNextPage) fetchNextPage() }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator className="py-4" /> : null}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  )
}
