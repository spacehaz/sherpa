import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { store } from '../store'
import { logout } from '../store/slices/auth-slice'
import { router } from 'expo-router'

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://193.233.250.253:3001/api'


export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Automatically attach JWT token to every request
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('token')
      store.dispatch(logout())
      router.replace('/(auth)/start')
    }
    return Promise.reject(error)
  }
)