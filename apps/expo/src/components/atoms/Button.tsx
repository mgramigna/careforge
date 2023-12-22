import { type ReactNode } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from 'react-native';
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
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = ({
  leftIcon,
  rightIcon,
  variant,
  text,
  isLoading,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      className={cn(buttonVariants({ variant, className }), props.disabled && 'bg-coolGray-400/50')}
      disabled={isLoading || props.disabled}
    >
      {leftIcon && <View className="absolute left-0 pl-8">{leftIcon}</View>}
      <Text className="text-coolGray-50 text-center" weight="bold">
        {isLoading ? <ActivityIndicator className="text-coolGray-50" /> : text}
      </Text>
      {rightIcon && <View className="absolute right-0 pr-8">{rightIcon}</View>}
    </TouchableOpacity>
  );
};
