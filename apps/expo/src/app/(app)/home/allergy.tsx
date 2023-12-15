import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';

const Allergy = () => {
  const { patientId } = useAuth();

  return patientId ? (
    <ScreenView>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <Text>allergy</Text>
      </ScrollView>
    </ScreenView>
  ) : null;
};

export default Allergy;
