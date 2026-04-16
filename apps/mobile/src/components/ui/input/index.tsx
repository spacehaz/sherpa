import { View, Text, TextInput } from 'react-native'
import { TProps } from './types'

export default function Input({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: TProps) {
  return (
    <View className="gap-1.5">
      {label && (
        <Text className="text-xs font-medium text-gray-500">{label}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className={`
          border rounded-lg px-4 py-3 text-sm text-gray-800 bg-gray-50
          ${error ? 'border-red-400' : 'border-gray-200'}
        `}
      />
      {error && (
        <Text className="text-xs text-red-400">{error}</Text>
      )}
    </View>
  )
}