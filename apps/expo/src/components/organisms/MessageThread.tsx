import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { getCommunicationStringPayload } from '@/fhirpath/communication';
import dayjs from 'dayjs';

import { type Communication } from '@canvas-challenge/canvas';

import { ChatMessage } from '../molecules/ChatMessage';

export const MessageThread = ({
  messages,
  practitionerSenderName,
}: {
  messages: Communication[];
  practitionerSenderName: string;
}) => {
  const renderMessage = useCallback(
    (communication: Communication) => {
      const messageText = getCommunicationStringPayload(communication);
      const isSentByPatient = communication.sender.type === 'Patient';

      return (
        <View className="mt-8">
          <ChatMessage
            messageText={messageText}
            senderName={isSentByPatient ? 'Me' : practitionerSenderName}
            timestamp={communication.sent ? dayjs(communication.sent).toDate() : new Date()}
            isSentByPatient={isSentByPatient}
          />
        </View>
      );
    },
    [practitionerSenderName],
  );

  return (
    <FlatList
      data={messages}
      keyExtractor={(communication) => communication.id}
      renderItem={({ item: communication }) => renderMessage(communication)}
    />
  );
};
