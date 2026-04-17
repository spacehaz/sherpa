import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { router } from 'expo-router'
import { RootState } from '../src/store'
import { useAuth } from '../src/hooks/use-auth'
import { Button } from '../src/components/ui'

export default function AccountScreen() {
  const user = useSelector((state: RootState) => state.auth.user)
  const { logout } = useAuth()

  return (
    <View className="flex-1 px-6 pt-16 bg-white">
      <Text className="text-2xl font-bold text-gray-800 mb-1">{user?.name}</Text>
      <Text className="text-sm text-gray-400 mb-12">{user?.email}</Text>
      <View className="gap-3">
        <Button title="Log out" variant="secondary" onPress={logout} />
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </View>
  )
}
