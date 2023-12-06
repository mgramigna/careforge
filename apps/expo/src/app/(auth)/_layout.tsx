import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { palette } from '@/theme/colors';

export default function AuthLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerBackTitle: 'Back',
          headerTitle: '',
          headerStyle: {
            backgroundColor: palette.coolGray[200],
          },
          presentation: 'modal',
        }}
      />
      <StatusBar />
    </>
  );
}
