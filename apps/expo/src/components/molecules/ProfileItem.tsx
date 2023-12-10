import { type ReactNode } from 'react';
import { View } from 'react-native';
import { palette } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../atoms/Text';

export const ProfileItem = ({ leftIcon, title }: { leftIcon: ReactNode; title: string }) => {
  return (
    <View className="flex flex-row items-center justify-between py-4">
      <View className="flex flex-row items-center">
        <>
          {leftIcon}
          <Text className="pl-8">{title}</Text>
        </>
      </View>
      <View>
        <Ionicons size={24} name="chevron-forward" color={palette.coolGray[400]} />
      </View>
    </View>
  );
};
