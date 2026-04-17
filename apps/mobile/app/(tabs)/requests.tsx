import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import { useRequestsInfinite } from '../../src/hooks/use-requests'
import { RequestCard } from '../../src/components'

export default function RequestsScreen() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useRequestsInfinite()
  const items = data?.pages.flat() ?? []

  if (isLoading) return <ActivityIndicator className="flex-1" />
  if (isError) return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-gray-400">Failed to load requests</Text>
    </View>
  )

  return (
    <View className="flex-1">
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RequestCard request={item} />}
        onEndReached={() => { if (hasNextPage) fetchNextPage() }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator className="py-4" /> : null}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  )
}
