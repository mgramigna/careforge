import { View } from 'react-native';

import { Text } from './Text';

export const Chip = ({ text }: { text?: string }) => {
  return (
    <View className="rounded-full bg-cyan-200 p-4">
      <Text className="text-coolGray-700 text-xl">{text}</Text>
    </View>
  );
};
