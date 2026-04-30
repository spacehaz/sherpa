import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppSelector } from '../src/store/hooks'
import { useAuth } from '../src/hooks/use-auth'
import { getMe, updateMe, getUserRatings } from '../src/api/users'
import { Button, Input } from '../src/components/ui'
import { useTheme } from '../src/theme/ThemeProvider'
import { router } from 'expo-router'

export default function AccountScreen() {
  const queryClient = useQueryClient()
  const currentUserId = useAppSelector(state => state.auth.user?.id)
  const { logout } = useAuth()
  const { theme, toggle } = useTheme()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [hometown, setHometown] = useState('')

  const { data: user } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: getMe,
  })

  const { data: ratings = [] } = useQuery({
    queryKey: ['ratings', currentUserId],
    queryFn: () => getUserRatings(currentUserId!),
    enabled: !!currentUserId,
  })

  const { mutate: save, isPending } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
      setEditing(false)
    },
  })

  function startEditing() {
    setName(user?.name ?? '')
    setGender(user?.gender ?? '')
    setHometown(user?.hometown ?? '')
    setEditing(true)
  }

  const avgRating = user?.rating ? user.rating.toFixed(1) : '—'

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 24, paddingTop: 64 }}>
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-text">Account</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-muted text-sm">Back</Text>
        </TouchableOpacity>
      </View>

      {editing ? (
        <View className="gap-3 mb-6">
          <Input label="Name" value={name} onChangeText={setName} placeholder="Your name" />
          <Input label="Gender" value={gender} onChangeText={setGender} placeholder="male / female / other" />
          <Input label="Hometown" value={hometown} onChangeText={setHometown} placeholder="City" />
          <View className="flex-row gap-2 mt-1">
            <View className="flex-1">
              <Button title="Save" onPress={() => save({ name, gender, hometown })} loading={isPending} />
            </View>
            <View className="flex-1">
              <Button title="Cancel" variant="secondary" onPress={() => setEditing(false)} />
            </View>
          </View>
        </View>
      ) : (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text">{user?.name}</Text>
          <Text className="text-sm text-muted mb-2">{user?.email}</Text>
          {user?.hometown && <Text className="text-sm text-muted">{user.hometown}</Text>}
          {user?.gender && <Text className="text-sm text-muted capitalize">{user.gender}</Text>}
          <View className="flex-row items-center mt-3 mb-4">
            <Text className="text-2xl font-bold text-text mr-1">{avgRating}</Text>
            <Text className="text-muted text-sm">/ 5 · {ratings.length} reviews</Text>
          </View>
          <Button title="Edit profile" variant="secondary" onPress={startEditing} />
        </View>
      )}

      {ratings.length > 0 && (
        <View>
          <Text className="text-sm font-semibold text-muted mb-3">Reviews</Text>
          <View className="gap-3">
            {ratings.map(r => (
              <View key={r.id} className="bg-surface rounded-xl p-4">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-sm font-semibold text-text">{'★'.repeat(r.score)}{'☆'.repeat(5 - r.score)}</Text>
                  <Text className="text-xs text-muted">{new Date(r.createdAt).toLocaleDateString()}</Text>
                </View>
                {r.comment && <Text className="text-sm text-text">{r.comment}</Text>}
              </View>
            ))}
          </View>
        </View>
      )}

      <View className="mt-8 gap-3">
        <Button
          title={theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          variant="secondary"
          onPress={toggle}
        />
        <Button title="Log out" variant="secondary" onPress={logout} />
      </View>
    </ScrollView>
  )
}
