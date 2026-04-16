  import { useEffect } from 'react'
  import { Stack } from 'expo-router'
  import { Provider } from 'react-redux'
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
  import { GestureHandlerRootView } from 'react-native-gesture-handler'
  import { store } from '../src/store'
  import '../src/global.css'

  const queryClient = new QueryClient()

  export default function RootLayout() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
          </QueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    )
  }
