import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { usePatient } from '@/context/PatientContext';

const Index = () => {
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
    <SafeAreaView className="">
      <View className="text-center">
        <Text>Welcome, {patient.name.at(0)?.given}</Text>
      </View>
      <Pressable onPress={signOut}>
        <Text>Sign out</Text>
      </Pressable>
    </SafeAreaView>
  ) : null;
};

export default Index;
