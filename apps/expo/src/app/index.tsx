import React from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { api } from '@/utils/api';

const Index = () => {
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
                Alert.alert('hey');
              }}
            >
              <View className="w-full items-center border border-slate-200 p-8">
                <Text>
                  {patient.name.at(0)?.given?.join('-')} {patient.name.at(0)?.family}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;
