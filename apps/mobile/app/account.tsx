import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
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
      <Button title="Log out" variant="secondary" onPress={logout} />
    </View>
  )
}
