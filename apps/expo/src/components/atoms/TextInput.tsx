import { TextInput as RNTextInput, type TextInputProps as RNTextInputProps } from 'react-native';
import { cn } from '@/utils/cn';

export interface TextInputProps extends RNTextInputProps {
  withClear?: boolean;
}

export const TextInput = ({ className, ...props }: TextInputProps) => {
  return <RNTextInput className={cn('bg-coolGray-100 rounded-md p-6', className)} {...props} />;
};
