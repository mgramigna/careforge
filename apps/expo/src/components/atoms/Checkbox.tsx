import { TouchableWithoutFeedback, View } from 'react-native';
import { palette } from '@/theme/colors';
import { cn } from '@/utils/cn';
import { Ionicons } from '@expo/vector-icons';

import { Text } from './Text';

export const Checkbox = ({
  onPress,
  label,
  checked,
}: {
  onPress?: () => void;
  label?: string;
  checked?: boolean;
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View className="flex flex-row items-center">
        <View
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-md border-2 border-cyan-500',
            checked && 'bg-cyan-500',
          )}
        >
          <Ionicons
            name="checkmark"
            color={palette.coolGray[50]}
            className={cn('m-auto')}
            size={20}
          />
        </View>
        <Text className="ml-2">{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
