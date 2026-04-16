import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { store } from '../src/store'
import { setCredentials } from '../src/store/slices/auth-slice'
import { getMe } from '../src/api/users'

async function resolveAuth(): Promise<'tabs' | 'start'> {
  const token = await SecureStore.getItemAsync('token')
  if (!token) return 'start'
  try {
    const user = await getMe()
    store.dispatch(setCredentials({ user, token }))
    return 'tabs'
  } catch {
    await SecureStore.deleteItemAsync('token')
    return 'start'
  }
}

export default function SplashScreen() {
  useEffect(() => {
    // run auth check and 2.5s delay in parallel — navigate when both finish
    Promise.all([
      resolveAuth(),
      new Promise<void>(resolve => setTimeout(resolve, 2500)),
    ]).then(([destination]) => {
      router.replace(destination === 'tabs' ? '/(tabs)/offers' : '/(auth)/start')
    })
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Sherpa</Text>
    </View>
  )
}