import { View, type ViewProps } from 'react-native';
import { cn } from '@/utils/cn';

export const Skeleton = ({ className, ...props }: ViewProps) => {
  return <View className={cn('bg-muted animate-pulse rounded-md', className)} {...props} />;
};
