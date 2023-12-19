import React, { Fragment } from 'react';
import { ActivityIndicator, Linking, ScrollView, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { AllergyDetail } from '@/components/organisms/AllergyDetail';
import { HomeAppointmentList } from '@/components/organisms/HomeAppointmentList';
import { ImmunizationDetail } from '@/components/organisms/ImmunizationDetail';
import { LabDetail } from '@/components/organisms/LabDetail';
import { MedicationDetail } from '@/components/organisms/MedicationDetail';
import { useAuth } from '@/context/AuthContext';
import { usePatient } from '@/context/PatientContext';
import { getFirstName } from '@/fhirpath/patient';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';

const Home = () => {
  const { patientId } = useAuth();
  const { patient, isLoading } = usePatient();

  const { data: appointmentBundle, isLoading: appointmentsLoading } =
    api.appointment.search.useQuery(
      {
        patient: `Patient/${patientId!}`,
        _sort: 'date',
        date: `ge${dayjs().format('YYYY-MM-DD')}`,
      },
      {
        enabled: !!patientId,
      },
    );

  const { data: allergyBundle, isLoading: allergiesLoading } =
    api.allergyintolerance.search.useQuery(
      {
        patient: patientId!,
      },
      {
        enabled: !!patientId,
      },
    );

  const { data: medicationStatementBundle, isLoading: medicationsLoading } =
    api.medicationstatement.search.useQuery(
      {
        patient: patientId!,
      },
      {
        enabled: !!patientId,
      },
    );

  const { data: immunizationsBundle, isLoading: vaccinesLoading } =
    api.immunization.search.useQuery(
      {
        patient: patientId!,
      },
      {
        enabled: !!patientId,
      },
    );

  const { data: labDocumentBundle, isLoading: labsLoading } = api.documentreference.search.useQuery(
    {
      patient: patientId!,
      category: 'labreport',
    },
    {
      enabled: !!patientId,
    },
  );

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
        <View className="flex w-full flex-row items-center justify-between">
          <Text className="text-3xl" weight="bold">
            Hello, {getFirstName(patient)}
          </Text>
          <Text>{dayjs(new Date()).format('dddd, MMM DD')}</Text>
        </View>
        <View className="mt-12">
          <View className="mb-4 flex flex-row items-center">
            <Ionicons name="calendar" size={24} color={palette.purple[200]} />
            <Text className="ml-2 text-3xl">My Appointments</Text>
          </View>
          {appointmentsLoading && <Skeleton className="bg-coolGray-400 h-24" />}
          {!appointmentsLoading && (appointmentBundle?.total ?? 0) > 0 ? (
            <HomeAppointmentList
              appointments={appointmentBundle?.entry?.map(({ resource }) => resource) ?? []}
            />
          ) : (
            <View className="flex h-24 w-full items-center justify-center">
              <Text italic>No upcoming appointments</Text>
            </View>
          )}
          <Link href="/appointments/" asChild>
            <Button text="Schedule Appointment" className="mt-4" />
          </Link>
        </View>
        <View className="mt-12">
          <View className="mb-4 flex flex-row items-center">
            <Ionicons name="flask" size={24} color={palette.purple[200]} />
            <Text className="ml-2 text-3xl">My Labs</Text>
          </View>
          {labsLoading && <Skeleton className="bg-coolGray-400 h-24" />}
          {!labsLoading && (labDocumentBundle?.total ?? 0) > 0 ? (
            <View className="flex gap-4">
              {labDocumentBundle?.entry?.map(({ resource }) => (
                <Fragment key={resource.id}>
                  <LabDetail documentReference={resource} />
                </Fragment>
              ))}
            </View>
          ) : (
            <View className="flex h-24 w-full items-center justify-center">
              <Text italic>No Recent Labs</Text>
            </View>
          )}
        </View>
        <View className="mt-12">
          <View className="mb-4 flex flex-row items-center">
            <MaterialCommunityIcons name="allergy" size={24} color={palette.purple[200]} />
            <Text className="ml-2 text-3xl">My Allergies</Text>
          </View>
          {allergiesLoading && <Skeleton className="bg-coolGray-400 h-24" />}
          {!allergiesLoading && (allergyBundle?.total ?? 0) > 0 ? (
            <View className="flex gap-4">
              {allergyBundle?.entry?.map(({ resource }) => (
                <Fragment key={resource.id}>
                  <AllergyDetail allergyIntolerance={resource} />
                </Fragment>
              ))}
            </View>
          ) : (
            <View className="flex h-24 w-full items-center justify-center">
              <Text italic>No known allergies</Text>
            </View>
          )}
          <Link href="/home/allergy" asChild>
            <Button text="Update Allergies" className="mt-4" />
          </Link>
        </View>
        <View className="mt-12">
          <View className="mb-4 flex flex-row items-center">
            <MaterialCommunityIcons name="pill" size={24} color={palette.purple[200]} />
            <Text className="ml-2 text-3xl">My Medications</Text>
          </View>
          {medicationsLoading && <Skeleton className="bg-coolGray-400 h-24" />}
          {!medicationsLoading && (medicationStatementBundle?.total ?? 0) > 0 ? (
            <View className="flex gap-4">
              {medicationStatementBundle?.entry?.map(({ resource }) => (
                <Fragment key={resource.id}>
                  <MedicationDetail medicationStatement={resource} />
                </Fragment>
              ))}
            </View>
          ) : (
            <View className="flex h-24 w-full items-center justify-center">
              <Text italic>No current medications</Text>
            </View>
          )}
          <Link href="/home/medication" asChild>
            <Button text="Update Medications" className="mt-4" />
          </Link>
        </View>
        <View className="mt-12">
          <View className="mb-4 flex flex-row items-center">
            <MaterialCommunityIcons name="needle" size={24} color={palette.purple[200]} />
            <Text className="ml-2 text-3xl">My Vaccines</Text>
          </View>
          {vaccinesLoading && <Skeleton className="bg-coolGray-400 h-24" />}
          {!vaccinesLoading && (immunizationsBundle?.total ?? 0) > 0 ? (
            <View className="flex gap-4">
              {immunizationsBundle?.entry?.map(({ resource }) => (
                <Fragment key={resource.id}>
                  <ImmunizationDetail immunization={resource} />
                </Fragment>
              ))}
            </View>
          ) : (
            <View className="flex h-24 w-full items-center justify-center">
              <Text italic>No vaccines on record</Text>
            </View>
          )}
          <Button
            text="Find Vaccines"
            className="mt-4"
            onPress={() => Linking.openURL('https://www.vaccines.gov')}
          />
        </View>
      </ScrollView>
    </ScreenView>
  ) : null;
};

export default Home;
