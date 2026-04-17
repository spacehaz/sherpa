import { useState } from 'react'
import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { Button, Input } from '../../src/components/ui'
import { useAuth } from '../../src/hooks/use-auth'

export default function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, isLoading, error } = useAuth()

  return (
    <View className="flex-1 px-6 pt-16 bg-white">
      <Text className="text-2xl font-bold text-gray-800 mb-8">Create account</Text>
      <View className="gap-3 mb-6">
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="John Doe"
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
        />
      </View>
      {error && <Text className="text-xs text-red-400 mb-4">{error}</Text>}
      <View className="gap-3">
        <Button title="Create account" onPress={() => register(email, password, name)} loading={isLoading} />
        <Button title="Back" variant="secondary" onPress={() => router.back()} />
      </View>
    </View>
  )
}
