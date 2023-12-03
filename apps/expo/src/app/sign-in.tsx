import React from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { Text } from '@/components/atoms/Text';
import { useAuth } from '@/context/AuthContext';
import { getFullName } from '@/fhirpath/patient';
import { api } from '@/utils/api';

const SignIn = () => {
  const { signIn, patientId } = useAuth();
  const { data: bundle, isLoading } = api.patient.search.useQuery({
    active: true,
  });

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (patientId) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView className="">
      <Stack.Screen options={{ title: 'Home Page' }} />
      <View className="h-full w-full">
        <FlatList
          data={bundle?.entry?.map(({ resource }) => resource) ?? []}
          keyExtractor={(patient) => patient.id}
          renderItem={({ item: patient }) => (
            <Pressable
              onPress={() => {
                signIn(patient.id);
              }}
            >
              <View className="border-coolGray-200 w-full items-center border p-8">
                <Text>{getFullName(patient)}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
