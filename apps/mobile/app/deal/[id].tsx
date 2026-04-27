import { useState, useRef } from 'react'
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDeal, getDealMessages, sendDealMessage, acceptMarkup, updateDealStatus } from '../../src/api/deals'
import { useAppSelector } from '../../src/store/hooks'
import { DealMessage } from '@sherpa/shared'

export default function DealScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const queryClient = useQueryClient()
  const currentUserId = useAppSelector(state => state.auth.user?.id)
  const [text, setText] = useState('')
  const [proposing, setProposing] = useState(false)
  const [markup, setMarkup] = useState('')
  const listRef = useRef<FlatList<DealMessage>>(null)

  const { data: deal, isLoading: dealLoading } = useQuery({
    queryKey: ['deals', id],
    queryFn: () => getDeal(id),
  })

  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['deals', id, 'messages'],
    queryFn: () => getDealMessages(id),
    refetchInterval: 5000,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: ({ message, proposedMarkupPercent }: { message: string; proposedMarkupPercent?: number }) =>
      sendDealMessage(id, message, proposedMarkupPercent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals', id, 'messages'] })
      setText('')
      setMarkup('')
      setProposing(false)
    },
  })

  const { mutate: acceptMarkupMutate, isPending: isAccepting } = useMutation({
    mutationFn: (markupPercent: number) => acceptMarkup(id, markupPercent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals', id] })
    },
  })

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: (status: string) => updateDealStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals', id] })
      queryClient.invalidateQueries({ queryKey: ['deals', 'my'] })
    },
  })

  const isResponder = currentUserId === deal?.responderId
  const isTraveler = currentUserId === deal?.travelerId
  const isInitiator = currentUserId === deal?.initiatorId

  function handleSend() {
    const trimmed = text.trim()
    if (!trimmed || isPending) return
    const proposedMarkupPercent = proposing && markup ? parseFloat(markup) : undefined
    mutate({ message: trimmed, proposedMarkupPercent })
  }

  const item = deal?.offer ?? deal?.request

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View className="flex-row items-center px-4 pt-14 pb-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-gray-500 text-base">←</Text>
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
            {dealLoading ? '...' : (item?.title ?? 'Deal')}
          </Text>
          {deal && (
            <Text className="text-xs text-gray-400">{deal.status}</Text>
          )}
        </View>
      </View>

      {deal && (
        <View className="flex-row gap-2 px-4 py-2 border-b border-gray-100">
          {isResponder && deal.status === 'pending' && (
            <>
              <TouchableOpacity
                onPress={() => updateStatus('accepted')}
                disabled={isUpdatingStatus}
                className="flex-1 bg-gray-800 rounded-lg py-2 items-center"
              >
                <Text className="text-white text-xs font-medium">Accept deal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => updateStatus('rejected')}
                disabled={isUpdatingStatus}
                className="flex-1 border border-gray-300 rounded-lg py-2 items-center"
              >
                <Text className="text-gray-600 text-xs font-medium">Reject</Text>
              </TouchableOpacity>
            </>
          )}
          {isTraveler && deal.status === 'accepted' && (
            <TouchableOpacity
              onPress={() => updateStatus('completed')}
              disabled={isUpdatingStatus}
              className="flex-1 bg-gray-800 rounded-lg py-2 items-center"
            >
              <Text className="text-white text-xs font-medium">Mark as completed</Text>
            </TouchableOpacity>
          )}
          {isInitiator && deal.status === 'pending' && (
            <TouchableOpacity
              onPress={() => updateStatus('rejected')}
              disabled={isUpdatingStatus}
              className="flex-1 border border-gray-300 rounded-lg py-2 items-center"
            >
              <Text className="text-gray-600 text-xs font-medium">Cancel deal</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {messagesLoading ? (
        <ActivityIndicator className="flex-1" />
      ) : (
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={m => m.id}
          contentContainerStyle={{ padding: 16, gap: 8 }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-16">
              <Text className="text-gray-400 text-sm">No messages yet. Say hi!</Text>
            </View>
          }
          renderItem={({ item: msg }) => {
            const isMine = msg.senderId === currentUserId
            return (
              <View className={`max-w-[80%] ${isMine ? 'self-end' : 'self-start'}`}>
                <View className={`rounded-2xl px-4 py-2 ${isMine ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <Text className={`text-sm ${isMine ? 'text-white' : 'text-gray-800'}`}>
                    {msg.message}
                  </Text>
                  {msg.proposedMarkupPercent != null && (
                    <View className={`mt-2 px-2 py-1 rounded-lg ${isMine ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <Text className={`text-xs font-medium ${isMine ? 'text-gray-200' : 'text-gray-600'}`}>
                        Proposed markup: {msg.proposedMarkupPercent}%
                      </Text>
                      {!isMine && deal?.status === 'pending' && (
                        <TouchableOpacity
                          onPress={() => acceptMarkupMutate(msg.proposedMarkupPercent!)}
                          disabled={isAccepting}
                          className="mt-1 bg-gray-800 rounded px-2 py-1 items-center"
                        >
                          <Text className="text-white text-xs font-medium">
                            {isAccepting ? 'Accepting...' : 'Accept'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
                <Text className={`text-xs text-gray-400 mt-1 ${isMine ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            )
          }}
        />
      )}

      <View className="px-4 pt-3 pb-3 border-t border-gray-100 gap-2">
        {proposing && (
          <View className="flex-row items-center gap-2">
            <Text className="text-xs text-gray-500">Markup %</Text>
            <TextInput
              className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-sm text-gray-800"
              placeholder="e.g. 10.5"
              value={markup}
              onChangeText={setMarkup}
              keyboardType="decimal-pad"
            />
          </View>
        )}

        <View className="flex-row items-end gap-2">
          <TouchableOpacity
            onPress={() => { setProposing(p => !p); setMarkup('') }}
            className={`px-3 py-3 rounded-2xl ${proposing ? 'bg-gray-800' : 'bg-gray-100'}`}
          >
            <Text className={`text-xs font-medium ${proposing ? 'text-white' : 'text-gray-500'}`}>%</Text>
          </TouchableOpacity>

          <TextInput
            className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-800"
            placeholder="Type a message..."
            value={text}
            onChangeText={setText}
            multiline
            maxLength={1000}
          />

          <TouchableOpacity
            onPress={handleSend}
            disabled={!text.trim() || isPending}
            className={`w-10 h-10 rounded-full items-center justify-center ${!text.trim() || isPending ? 'bg-gray-200' : 'bg-gray-800'}`}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white text-base">↑</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
