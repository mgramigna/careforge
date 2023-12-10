import React, { useMemo } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { PatientAvatar } from '@/components/atoms/PatientAvatar';
import { Text } from '@/components/atoms/Text';
import { ProfileItem } from '@/components/molecules/ProfileItem';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';
import { usePatient } from '@/context/PatientContext';
import { getFullName, getPhoto } from '@/fhirpath/patient';
import { palette } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const { signOut } = useAuth();
  const { patient, isLoading } = usePatient();

  const photoUrl = useMemo(() => (patient ? getPhoto(patient) : undefined), [patient]);

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
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <View className="flex flex-row items-center gap-8">
          {photoUrl && <PatientAvatar photoUrl={photoUrl} />}
          <Text className="text-3xl" weight="bold">
            {getFullName(patient)}
          </Text>
        </View>
        <Text className="mt-24 text-2xl" weight="bold">
          Settings
        </Text>
        <View className="mt-4">
          <TouchableOpacity
            onPress={() => {
              router.push('/profile/about');
            }}
            className="border-coolGray-200 border-t"
          >
            <ProfileItem
              title="Personal Information"
              leftIcon={
                <Ionicons name="person-circle-outline" size={36} color={palette.coolGray[400]} />
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push('/profile/billing');
            }}
            className="border-coolGray-200 border-y"
          >
            <ProfileItem
              title="Billing"
              leftIcon={<Ionicons name="card-outline" size={36} color={palette.coolGray[400]} />}
            />
          </TouchableOpacity>
        </View>
        <Text className="mt-12 text-2xl" weight="bold">
          Legal
        </Text>
        <View className="mt-4">
          <TouchableOpacity
            onPress={() => {
              router.push('/profile/documents');
            }}
            className="border-coolGray-200 border-y"
          >
            <ProfileItem
              title="Documents"
              leftIcon={
                <Ionicons name="document-outline" size={36} color={palette.coolGray[400]} />
              }
            />
          </TouchableOpacity>
        </View>
        <View className="mt-24">
          <Button onPress={signOut} variant="secondary" text="Log Out" />
        </View>
      </ScrollView>
    </ScreenView>
  ) : null;
};

export default Profile;
