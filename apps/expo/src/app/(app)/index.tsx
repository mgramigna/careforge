import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { HomeAppointmentList } from '@/components/organisms/HomeAppointmentList';
import { useAuth } from '@/context/AuthContext';
import { usePatient } from '@/context/PatientContext';
import { getFirstName } from '@/fhirpath/patient';
import { api } from '@/utils/api';
import dayjs from 'dayjs';

const Index = () => {
  const { patientId } = useAuth();
  const { patient, isLoading } = usePatient();

  const { data: appointmentBundle } = api.appointment.search.useQuery(
    {
      patient: `Patient/${patientId!}`,
      _sort: 'date',
    },
    {
      enabled: !!patientId,
    },
  );

  if (isLoading) {
    return (
      <ScreenView>
        <ActivityIndicator />
      </ScreenView>
    );
  }

  return patient ? (
    <ScreenView>
      <View className="flex w-full flex-row items-center justify-between">
        <Text className="text-4xl" weight="bold">
          Hello, {getFirstName(patient)}
        </Text>
        <Text>{dayjs(new Date()).format('dddd MMM DD')}</Text>
      </View>
      <View className="mt-24">
        <Text className="mb-4 text-3xl">Upcoming Appointments</Text>
        {(appointmentBundle?.total ?? 0) > 0 ? (
          <HomeAppointmentList
            appointments={appointmentBundle?.entry?.map(({ resource }) => resource) ?? []}
          />
        ) : (
          <View className="flex h-24 w-full items-center justify-center">
            <Text italic>No upcoming appointments</Text>
          </View>
        )}
        <Link href="/appointments" asChild>
          <Button text="Schedule Appointment" className="mt-4" />
        </Link>
      </View>
    </ScreenView>
  ) : null;
};

export default Index;
