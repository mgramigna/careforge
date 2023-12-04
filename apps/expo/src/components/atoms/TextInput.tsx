import { TextInput as RNTextInput, type TextInputProps as RNTextInputProps } from 'react-native';
import { cn } from '@/utils/cn';

export type TextInputProps = RNTextInputProps;

export const TextInput = ({ className, ...props }: TextInputProps) => {
  return (
    <RNTextInput className={cn('bg-coolGray-100 flex-1 rounded-full p-4', className)} {...props} />
  );
};
