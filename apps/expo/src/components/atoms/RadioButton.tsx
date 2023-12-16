import { TouchableWithoutFeedback, View } from 'react-native';
import { cn } from '@/utils/cn';

import { Text } from './Text';

export interface RadioButtonProps {
  selected?: boolean;
  label?: string;
  onPress?: () => void;
}

export const RadioButton = ({ label, selected, onPress }: RadioButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View className="flex flex-row items-center">
        <View
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-500',
          )}
        >
          <View
            className={cn(
              'border-coolGray-200 m-auto h-5 w-5 rounded-full',
              selected && 'bg-cyan-500',
            )}
          />
        </View>
        <Text className="ml-2">{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
