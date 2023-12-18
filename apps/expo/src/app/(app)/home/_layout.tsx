import { Stack } from 'expo-router';
import { palette } from '@/theme/colors';

const TabLayout = () => {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerTitle: '',
        headerStyle: {
          backgroundColor: palette.coolGray[700],
        },
        headerTintColor: palette.pink[300],
      }}
    />
  );
};

export default TabLayout;
