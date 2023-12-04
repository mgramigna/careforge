import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '@/components/atoms/Button';
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
      <Button onPress={signOut} variant="secondary" text="Sign Out" className="" />
    </ScreenView>
  ) : null;
};

export default Profile;
