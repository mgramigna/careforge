import { type PropsWithChildren } from 'react';
import { SafeAreaView, View } from 'react-native';
import { cn } from '@/utils/cn';

export interface ScreenViewProps extends PropsWithChildren {
  centered?: boolean;
  noPadding?: boolean;
}

export const ScreenView = ({ noPadding, centered, children }: ScreenViewProps) => {
  return (
    <SafeAreaView>
      <View
        className={cn(
          'bg-coolGray-50 flex h-full px-4 pt-8',
          centered && 'items-center',
          noPadding && 'p-0',
        )}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
