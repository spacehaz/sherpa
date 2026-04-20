import { useState } from 'react'
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ItemCategory } from '@sherpa/shared'
import { createOffer } from '../../api/offers'
import { Button, Input } from '../ui'

const CATEGORIES = Object.values(ItemCategory).map(value => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value,
}))

type Props = {
  visible: boolean
  onClose: () => void
}

export function CreateOfferModal({ visible, onClose }: Props) {
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

  const { mutate, isPending, error } = useMutation({
    mutationFn: createOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] })
      onClose()
      reset()
    },
  })

  function reset() {
    setTitle(''); setCategory(ItemCategory.ELECTRONICS); setFrom(''); setTo('')
    setPriceOriginal(''); setMarkupPercent(''); setDeliveryDate(new Date()); setDescription('')
    setShowCategoryPicker(false); setShowDatePicker(false)
  }

  function handleSubmit() {
    mutate({
      title,
      category,
      from,
      to,
      priceOriginal: parseFloat(priceOriginal),
      markupPercent: parseFloat(markupPercent),
      deliveryDate: deliveryDate.toISOString(),
      description: description || undefined,
    })
  }

  const categoryLabel = CATEGORIES.find(c => c.value === category)?.label ?? category

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <Text className="text-xl font-bold text-gray-800">New offer</Text>
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
                onValueChange={(v) => setCategory(v)}
              >
                {CATEGORIES.map(c => (
                  <Picker.Item key={c.value} label={c.label} value={c.value} />
                ))}
              </Picker>
            )}
          </View>

          <Input label="From" value={from} onChangeText={setFrom} placeholder="New York" />
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
          {error && <Text className="text-xs text-red-400">{(error as Error).message}</Text>}
          <Button title="Create offer" onPress={handleSubmit} loading={isPending} />
        </ScrollView>
      </View>
    </Modal>
  )
}
