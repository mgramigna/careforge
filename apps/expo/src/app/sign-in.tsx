import React from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';
import fhirpath from 'fhirpath';

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
              <View className="w-full items-center border border-slate-200 p-8">
                <Text>
                  {fhirpath.evaluate(patient, 'name.given')} {patient.name.at(0)?.family}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
