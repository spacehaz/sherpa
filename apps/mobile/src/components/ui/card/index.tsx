import { View } from 'react-native'
import { TProps } from './types'

export default function Card({ children }: TProps) {
  return (
    <View className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
      {children}
    </View>
  )
}