import { ActivityIndicator, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { usePatient } from '@/context/PatientContext';
import { getFirstName } from '@/fhirpath/patient';

const Appointments = () => {
  const { patient, isLoading } = usePatient();

  if (isLoading) {
    return (
      <ScreenView>
        <ActivityIndicator />
      </ScreenView>
    );
  }

  return patient ? (
    <ScreenView>
      <View className="p-4 pt-12">
        <Text className="text-center text-5xl ">Welcome appts, {getFirstName(patient)}</Text>
      </View>
      <Link href="/appointments/sub" asChild>
        <Button text="Schedule Appointment" className="mt-4" />
      </Link>
    </ScreenView>
  ) : null;
};

export default Appointments;
