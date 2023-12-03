import { type PropsWithChildren } from 'react';
import { SafeAreaView, View } from 'react-native';

export const ScreenView = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaView>
      <View className="bg-coolGray-50 flex h-screen items-center">{children}</View>
    </SafeAreaView>
  );
};
