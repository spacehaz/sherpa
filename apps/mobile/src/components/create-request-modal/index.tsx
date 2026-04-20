import { useState } from 'react'
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRequest } from '../../api/requests'
import { Button, Input } from '../ui'

type Props = {
  visible: boolean
  onClose: () => void
}

export function CreateRequestModal({ visible, onClose }: Props) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [priceOriginal, setPriceOriginal] = useState('')
  const [markupPercent, setMarkupPercent] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [description, setDescription] = useState('')

  const { mutate, isPending, error } = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
      onClose()
      reset()
    },
  })

  function reset() {
    setTitle(''); setCategory(''); setFrom(''); setTo('')
    setPriceOriginal(''); setMarkupPercent(''); setDeliveryDate(''); setDescription('')
  }

  function handleSubmit() {
    mutate({
      title,
      category,
      from: from || undefined,
      to,
      priceOriginal: parseFloat(priceOriginal),
      markupPercent: parseFloat(markupPercent),
      deliveryDate,
      description: description || undefined,
    })
  }

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
          <Input label="Category" value={category} onChangeText={setCategory} placeholder="Electronics" />
          <Input label="From (optional)" value={from} onChangeText={setFrom} placeholder="New York" />
          <Input label="To" value={to} onChangeText={setTo} placeholder="Almaty" />
          <Input label="Original price" value={priceOriginal} onChangeText={setPriceOriginal} placeholder="999" keyboardType="decimal-pad" />
          <Input label="Markup %" value={markupPercent} onChangeText={setMarkupPercent} placeholder="10" keyboardType="decimal-pad" />
          <Input label="Delivery date" value={deliveryDate} onChangeText={setDeliveryDate} placeholder="2026-05-01" />
          <Input label="Description (optional)" value={description} onChangeText={setDescription} placeholder="Any notes..." />
          {error && <Text className="text-xs text-red-400">{(error as Error).message}</Text>}
          <Button title="Create request" onPress={handleSubmit} loading={isPending} />
        </ScrollView>
      </View>
    </Modal>
  )
}
