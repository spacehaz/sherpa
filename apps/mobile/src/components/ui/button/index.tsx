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
        ${isPrimary ? 'bg-primary' : 'bg-transparent border border-primary'}
        ${disabled || loading ? 'opacity-40' : 'opacity-100'}
      `}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? 'rgb(var(--color-on-primary))' : 'rgb(var(--color-primary))'} />
      ) : (
        <Text className={`text-sm font-semibold ${isPrimary ? 'text-on-primary' : 'text-primary'}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}