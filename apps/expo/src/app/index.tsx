import { ActivityIndicator, SafeAreaView } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const { isLoading, patientId } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!patientId) {
    return <Redirect href="/sign-in" />;
  }

  return <Redirect href="/home/" />;
}
