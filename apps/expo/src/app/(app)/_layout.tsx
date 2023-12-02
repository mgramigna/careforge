import { ActivityIndicator, SafeAreaView } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/context/AuthContext';
import { PatientProvider } from '@/context/PatientContext';

export default function AppLayout() {
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

  return (
    <PatientProvider patientId={patientId}>
      <Stack />
      <StatusBar />
    </PatientProvider>
  );
}
