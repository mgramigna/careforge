import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';

const Medication = () => {
  const { patientId } = useAuth();

  return patientId ? (
    <ScreenView>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <Text>Medication</Text>
      </ScrollView>
    </ScreenView>
  ) : null;
};

export default Medication;
