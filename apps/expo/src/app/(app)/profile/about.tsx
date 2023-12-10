import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { usePatient } from '@/context/PatientContext';

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
      <View className="h-full">
        <Text className="text-2xl" weight="bold">
          About Me
        </Text>
      </View>
    </ScreenView>
  ) : null;
};

export default About;
