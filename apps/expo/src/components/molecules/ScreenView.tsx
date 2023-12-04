import { type PropsWithChildren } from 'react';
import { SafeAreaView, View } from 'react-native';
import { cn } from '@/utils/cn';

export interface ScreenViewProps extends PropsWithChildren {
  centered?: boolean;
}

export const ScreenView = ({ centered, children }: ScreenViewProps) => {
  return (
    <SafeAreaView>
      <View className={cn('bg-coolGray-50 flex h-screen px-4 pt-8', centered && 'items-center')}>
        {children}
      </View>
    </SafeAreaView>
  );
};
