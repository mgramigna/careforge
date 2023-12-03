import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { HomeAppointmentList } from '@/components/organisms/HomeAppointmentList';
import { useAuth } from '@/context/AuthContext';
import { usePatient } from '@/context/PatientContext';
import { getFirstName } from '@/fhirpath/patient';
import { api } from '@/utils/api';

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
      <Text className="text-center text-5xl">Welcome, {getFirstName(patient)}</Text>
      <HomeAppointmentList
        appointments={appointmentBundle?.entry?.map(({ resource }) => resource) ?? []}
      />
    </ScreenView>
  ) : null;
};

export default Index;
