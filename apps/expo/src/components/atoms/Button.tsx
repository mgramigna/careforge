import { ActivityIndicator, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

import { Text } from './Text';

const buttonVariants = cva('rounded-md p-6 inline-flex justify-center flex-row items-center', {
  variants: {
    variant: {
      default: 'bg-pink-500',
      secondary: 'bg-coolGray-500',
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
      className={buttonVariants({ variant, className })}
      disabled={isLoading ?? props.disabled}
    >
      <Text className="text-coolGray-50 text-center" weight="bold">
        {isLoading ? <ActivityIndicator className="text-coolGray-50" /> : text}
      </Text>
    </TouchableOpacity>
  );
};
