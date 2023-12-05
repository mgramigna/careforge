import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { usePatient } from '@/context/PatientContext';

const SubProfile = () => {
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
      <Stack.Screen />

      <Text>Some sub route in profile</Text>
    </ScreenView>
  ) : null;
};

export default SubProfile;
