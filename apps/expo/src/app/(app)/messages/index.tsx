import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { usePatient } from '@/context/PatientContext';
import { getFirstName } from '@/fhirpath/patient';

const Messages = () => {
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
        <Text className="text-center text-5xl ">Welcome message, {getFirstName(patient)}</Text>
      </View>
    </ScreenView>
  ) : null;
};

export default Messages;
