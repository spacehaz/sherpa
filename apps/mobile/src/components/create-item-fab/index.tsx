import { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { CreateOfferModal } from '../create-offer-modal'
import { CreateRequestModal } from '../create-request-modal'

type Props = {
  type: 'offer' | 'request'
}

export function CreateItemFab({ type }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-gray-800 px-5 py-3 rounded-xl"
        onPress={() => setVisible(true)}
      >
        <Text className="text-white font-semibold">
          + New {type}
        </Text>
      </TouchableOpacity>

      {type === 'offer' ? (
        <CreateOfferModal visible={visible} onClose={() => setVisible(false)} />
      ) : (
        <CreateRequestModal visible={visible} onClose={() => setVisible(false)} />
      )}
    </>
  )
}
