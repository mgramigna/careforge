import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';
import { usePatient } from '@/context/PatientContext';

const Profile = () => {
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
      <Pressable onPress={signOut}>
        <Text>Sign out</Text>
      </Pressable>
    </ScreenView>
  ) : null;
};

export default Profile;
