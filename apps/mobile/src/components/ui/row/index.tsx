import { View, Text } from 'react-native'

type TProps = {
  label: string
  value: string
  bold?: boolean
}

export default function Row({ label, value, bold }: TProps) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-sm text-muted">{label}</Text>
      <Text className={`text-sm ${bold ? 'font-semibold text-text' : 'text-muted'}`}>{value}</Text>
    </View>
  )
}
