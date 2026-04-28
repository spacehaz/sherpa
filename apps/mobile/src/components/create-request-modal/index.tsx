import { useState } from 'react'
import { Modal, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ItemCategory } from '@sherpa/shared'
import { createRequest } from '../../api/requests'
import { Button, Input } from '../ui'

const CATEGORIES = Object.values(ItemCategory).map(value => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value,
}))

type Props = {
  visible: boolean
  onClose: () => void
}

export function CreateRequestModal({ visible, onClose }: Props) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(ItemCategory.ELECTRONICS)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [priceOriginal, setPriceOriginal] = useState('')
  const [markupPercent, setMarkupPercent] = useState('')
  const [deliveryDate, setDeliveryDate] = useState(new Date())
  const [description, setDescription] = useState('')
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [imageUri, setImageUri] = useState<string | null>(null)

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ body, imageUri }: { body: Parameters<typeof createRequest>[0]; imageUri?: string }) =>
      createRequest(body, imageUri),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
      queryClient.invalidateQueries({ queryKey: ['my-requests'] })
      onClose()
      reset()
    },
  })

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    })
    if (!result.canceled) setImageUri(result.assets[0].uri)
  }

  function reset() {
    setTitle(''); setCategory(ItemCategory.ELECTRONICS); setFrom(''); setTo('')
    setPriceOriginal(''); setMarkupPercent(''); setDeliveryDate(new Date()); setDescription('')
    setShowCategoryPicker(false); setShowDatePicker(false); setImageUri(null)
  }

  function handleSubmit() {
    mutate({
      body: {
        title,
        category,
        from: from || undefined,
        to,
        priceOriginal: parseFloat(priceOriginal),
        markupPercent: parseFloat(markupPercent),
        deliveryDate: deliveryDate.toISOString(),
        description: description || undefined,
      },
      imageUri: imageUri ?? undefined,
    })
  }

  const categoryLabel = CATEGORIES.find(c => c.value === category)?.label ?? category

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <Text className="text-xl font-bold text-gray-800">New request</Text>
          <TouchableOpacity onPress={() => { onClose(); reset() }}>
            <Text className="text-gray-400 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ gap: 12, paddingBottom: 32 }}>
          <Input label="Title" value={title} onChangeText={setTitle} placeholder="iPhone 15 Pro" />

          <View className="gap-1.5">
            <Text className="text-xs font-medium text-gray-500">Category</Text>
            <TouchableOpacity
              onPress={() => { setShowCategoryPicker(!showCategoryPicker); setShowDatePicker(false) }}
              style={{ height: 48 }}
              className="border border-gray-200 rounded-lg px-4 bg-gray-50 justify-center"
            >
              <Text className="text-sm text-gray-800">{categoryLabel}</Text>
            </TouchableOpacity>
            {showCategoryPicker && (
              <Picker
                selectedValue={category}
                onValueChange={(v) => { setCategory(v); setShowCategoryPicker(false) }}
              >
                {CATEGORIES.map(c => (
                  <Picker.Item key={c.value} label={c.label} value={c.value} />
                ))}
              </Picker>
            )}
          </View>

          <Input label="From (optional)" value={from} onChangeText={setFrom} placeholder="New York" />
          <Input label="To" value={to} onChangeText={setTo} placeholder="Almaty" />
          <Input label="Original price" value={priceOriginal} onChangeText={setPriceOriginal} placeholder="999" keyboardType="decimal-pad" />
          <Input label="Markup %" value={markupPercent} onChangeText={setMarkupPercent} placeholder="10" keyboardType="decimal-pad" />

          <View className="gap-1.5">
            <Text className="text-xs font-medium text-gray-500">Delivery date</Text>
            <TouchableOpacity
              onPress={() => { setShowDatePicker(!showDatePicker); setShowCategoryPicker(false) }}
              style={{ height: 48 }}
              className="border border-gray-200 rounded-lg px-4 bg-gray-50 justify-center"
            >
              <Text className="text-sm text-gray-800">{deliveryDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={deliveryDate}
                mode="date"
                display="spinner"
                onChange={(_, selected) => selected && setDeliveryDate(selected)}
              />
            )}
          </View>

          <Input label="Description (optional)" value={description} onChangeText={setDescription} placeholder="Any notes..." />

          <View className="gap-1.5">
            <Text className="text-xs font-medium text-gray-500">Photo (optional)</Text>
            <TouchableOpacity
              onPress={pickImage}
              className="border border-dashed border-gray-300 rounded-lg h-32 items-center justify-center bg-gray-50"
            >
              {imageUri ? (
                <Image source={{ uri: imageUri }} className="w-full h-full rounded-lg" resizeMode="cover" />
              ) : (
                <Text className="text-sm text-gray-400">Tap to pick an image</Text>
              )}
            </TouchableOpacity>
          </View>

          {error && <Text className="text-xs text-red-400">{(error as Error).message}</Text>}
          <Button title="Create request" onPress={handleSubmit} loading={isPending} />
        </ScrollView>
      </View>
    </Modal>
  )
}
