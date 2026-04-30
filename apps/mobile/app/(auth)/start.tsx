import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { Button } from '../../src/components/ui'

export default function StartScreen() {
  return (
    <View className="flex-1 items-center justify-center px-6 bg-background">
      <Text className="text-4xl font-bold text-text mb-2">Sherpa</Text>
      <Text className="text-sm text-muted mb-16">Your cross-border shopping companion</Text>
      <View className="w-full gap-3">
        <Button title="Create account" onPress={() => router.push('/(auth)/register')} />
        <Button title="Log in" variant="secondary" onPress={() => router.push('/(auth)/login')} />
      </View>
    </View>
  )
}
