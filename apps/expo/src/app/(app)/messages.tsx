import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/atoms/Text';
import { useAuth } from '@/context/AuthContext';
import { usePatient } from '@/context/PatientContext';
import { getFirstName } from '@/fhirpath/patient';

const Messages = () => {
  const { signOut } = useAuth();
  const { patient, isLoading } = usePatient();

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return patient ? (
    <SafeAreaView>
      <View className="flex items-center">
        <View className="p-4 pt-12">
          <Text className="text-center text-5xl ">Welcome message, {getFirstName(patient)}</Text>
        </View>
        <Pressable onPress={signOut}>
          <Text>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  ) : null;
};

export default Messages;
