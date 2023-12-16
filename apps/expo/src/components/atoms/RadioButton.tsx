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
            'border-coolGray-200 h-8 w-8 rounded-full border bg-none',
            selected && 'bg-cyan-300',
          )}
        />
        <Text className="ml-2">{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
