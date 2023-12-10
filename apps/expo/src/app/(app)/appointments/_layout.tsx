import { Stack } from 'expo-router';
import { palette } from '@/theme/colors';

const TabLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Back',
        headerTitle: '',
        headerStyle: {
          backgroundColor: palette.coolGray[200],
        },
        headerTintColor: palette.pink[500],
      }}
    />
  );
};

export default TabLayout;
