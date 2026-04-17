import { Tabs } from 'expo-router'
import { router } from 'expo-router'
import { TouchableOpacity, Text } from 'react-native'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push('/account')} className="mr-4">
          <Text className="text-sm text-gray-600">Account</Text>
        </TouchableOpacity>
      )
    }}>
      <Tabs.Screen name="offers"      options={{ title: 'Offers' }} />
      <Tabs.Screen name="requests"    options={{ title: 'Requests' }} />
      <Tabs.Screen name="my-offers"   options={{ title: 'My Offers' }} />
      <Tabs.Screen name="my-requests" options={{ title: 'My Requests' }} />
      <Tabs.Screen name="deals"       options={{ title: 'Deals' }} />
    </Tabs>
  )
}
