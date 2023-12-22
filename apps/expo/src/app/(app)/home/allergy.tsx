import React from 'react';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';

const Allergy = () => {
  const { patientId } = useAuth();

  return patientId ? (
    <ScreenView>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <Text className="mt-8 text-xl">
          To update your allergies, please reach out to your care team
        </Text>
        <View className="mt-8 flex flex-row gap-8">
          <View className="flex-1">
            <Button text="Close" variant="secondary" onPress={() => router.push('..')} />
          </View>
        </View>
      </ScrollView>
    </ScreenView>
  ) : null;
};

export default Allergy;
