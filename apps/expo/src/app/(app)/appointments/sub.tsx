import { Stack } from 'expo-router';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';

const AppointmentDetailScreen = () => {
  return (
    <ScreenView>
      <Stack.Screen />

      <Text>Some appt. detail</Text>
    </ScreenView>
  );
};

export default AppointmentDetailScreen;
