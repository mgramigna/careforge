import { TextInput as RNTextInput, type TextInputProps as RNTextInputProps } from 'react-native';
import { cn } from '@/utils/cn';

export interface TextInputProps extends RNTextInputProps {
  withClear?: boolean;
  hasError?: boolean;
}

export const TextInput = ({ className, hasError, ...props }: TextInputProps) => {
  return (
    <RNTextInput
      className={cn(
        'text-coolGray-50 bg-coolGray-600 border-coolGray-300 placeholder:text-coolGray-200 rounded-md border p-6',
        className,
        hasError && 'border border-red-500',
      )}
      {...props}
    />
  );
};
