import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { TProps } from './types'

export default function Button({ title, onPress, loading, disabled, variant = 'primary' }: TProps) {
  const isPrimary = variant === 'primary'

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        py-3 px-5 rounded-lg items-center justify-center
        ${isPrimary ? 'bg-gray-800' : 'bg-transparent border border-gray-800'}
        ${disabled || loading ? 'opacity-40' : 'opacity-100'}
      `}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#fff' : '#1f2937'} />
      ) : (
        <Text className={`text-sm font-semibold ${isPrimary ? 'text-white' : 'text-gray-800'}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}