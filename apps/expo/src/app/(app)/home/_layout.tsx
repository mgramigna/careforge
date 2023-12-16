import { Stack } from 'expo-router';

const TabLayout = () => {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}
    />
  );
};

export default TabLayout;
