import { type ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '../atoms/Text';

export const DetailCard = ({
  leftIcon,
  rightIcon,
  onPress,
  text,
}: {
  text?: string | ReactNode | null;
  onPress?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="bg-coolGray-700 border-coolGray-300 flex flex-row items-center justify-between rounded-md border px-4 py-8">
        <View className="flex flex-row items-center">
          {leftIcon}
          <View className="pl-2">
            <Text className="text-lg">{text}</Text>
          </View>
        </View>
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
};
