import { ActivityIndicator, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

import { Text } from './Text';

const buttonVariants = cva('rounded-md p-6 justify-center flex-row items-center', {
  variants: {
    variant: {
      default: 'bg-pink-500',
      secondary: 'bg-cyan-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof buttonVariants> {
  text?: string;
  isLoading?: boolean;
}

export const Button = ({ variant, text, isLoading, className, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      className={cn(buttonVariants({ variant, className }), props.disabled && 'bg-coolGray-400/50')}
      disabled={isLoading || props.disabled}
    >
      <Text className="text-coolGray-50 text-center" weight="bold">
        {isLoading ? <ActivityIndicator className="text-coolGray-50" /> : text}
      </Text>
    </TouchableOpacity>
  );
};
