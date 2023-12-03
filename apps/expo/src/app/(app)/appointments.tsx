import { ActivityIndicator, Pressable, View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';
import { usePatient } from '@/context/PatientContext';
import { getFirstName } from '@/fhirpath/patient';

const Appointments = () => {
  const { signOut } = useAuth();
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
      <Pressable onPress={signOut}>
        <Text>Sign out</Text>
      </Pressable>
    </ScreenView>
  ) : null;
};

export default Appointments;
