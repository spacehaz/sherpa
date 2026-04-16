import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import { router } from 'expo-router'
import { loginRequest, registerRequest } from '../api/auth.api'
import { setCredentials, logout as logoutAction } from '../store/slices/auth-slice'

export function useAuth() {
  // local UI state — controls spinner and error message in the form
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // gives us access to dispatch Redux actions from inside a hook
  const dispatch = useDispatch()

  const login = async (email: string, password: string) => {
    setIsLoading(true)   // show spinner
    setError(null)       // clear any previous error

    try {
      // POST /auth/login — returns { user, token }
      const { data } = await loginRequest({ email, password })

      // save token to device keychain so it survives app restarts
      await SecureStore.setItemAsync('token', data.token)

      // put user + token into Redux so components can read them reactively
      dispatch(setCredentials({ user: data.user, token: data.token }))

      // replace instead of push — user can't go back to login by pressing back
      router.replace('/(tabs)/offers')

    } catch (e: any) {
      // e.response.data.message comes from NestJS validation/exception filters
      // fallback string covers network errors where there's no response body
      setError(e?.response?.data?.message ?? 'Login failed')

    } finally {
      // runs whether success or failure — always hide the spinner
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await registerRequest({ email, password, name })
      await SecureStore.setItemAsync('token', data.token)
      dispatch(setCredentials({ user: data.user, token: data.token }))
      router.replace('/(tabs)/offers')
    } catch (e: any) {
      setError(e?.response?.data?.message ?? 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    // wipe token from keychain — next app start will land on auth screen
    await SecureStore.deleteItemAsync('token')

    // clear user from Redux — components reading auth state update immediately
    dispatch(logoutAction())

    router.replace('/(auth)/start')
  }

  return { login, register, logout, isLoading, error }
}