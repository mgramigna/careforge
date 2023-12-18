import { View } from 'react-native';
import { cn } from '@/utils/cn';
import dayjs from 'dayjs';

import { Text } from '../atoms/Text';

export const ChatMessage = ({
  messageText,
  timestamp,
  senderName,
  isSentByPatient,
}: {
  messageText: string;
  timestamp: Date;
  senderName: string;
  isSentByPatient?: boolean;
}) => {
  return (
    <View
      className={cn(
        'bg-coolGray-700 w-3/4 rounded-xl p-6',
        isSentByPatient ? 'self-end bg-cyan-700' : 'self-start',
      )}
    >
      <View className="flex flex-row justify-between">
        <Text weight="bold" className="text-sm">
          {senderName}
        </Text>
        <Text className="text-coolGray-200 text-sm">{dayjs(timestamp).format('hh:mm a')}</Text>
      </View>
      <View className="mt-4">
        <Text className="text-lg">{messageText}</Text>
      </View>
    </View>
  );
};
