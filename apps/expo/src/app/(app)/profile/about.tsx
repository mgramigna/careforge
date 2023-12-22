import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { usePatient } from '@/context/PatientContext';

// import { getEthnicities, getRaces } from '@/fhirpath/patient';

const About = () => {
  const { patient, isLoading } = usePatient();

  if (isLoading) {
    return (
      <ScreenView>
        <View className="h-full">
          <ActivityIndicator />
        </View>
      </ScreenView>
    );
  }

  return patient ? (
    <ScreenView>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl" weight="bold">
          About Me
        </Text>
      </ScrollView>
    </ScreenView>
  ) : null;
};

export default About;
