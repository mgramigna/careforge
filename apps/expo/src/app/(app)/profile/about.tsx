import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Text } from '@/components/atoms/Text';
import { AddEditDemographicsModal } from '@/components/molecules/AddEditDemographicsModal';
import { AddGoalModal } from '@/components/molecules/AddGoalModal';
import { ScreenView } from '@/components/molecules/ScreenView';
import { type DemographicsFormType } from '@/components/organisms/DemographicsForm';
import { DemographicsInfo } from '@/components/organisms/DemographicsInfo';
import { usePatient } from '@/context/PatientContext';
import { getCodeFromConcept } from '@/fhirpath/utils';
import { palette } from '@/theme/colors';
import {
  ETHNICITY_EXTENSION_URL,
  GENDER_IDENTITY_EXTENSION_URL,
  RACE_EXTENSION_URL,
} from '@/types/patient';
import { api } from '@/utils/api';
import { getEthnicityExtension, getGenderIdentityExtension, getRaceExtension } from '@/utils/fhir';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { type Extension } from '@careforge/canvas';

const About = () => {
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [demographicsModalOpen, setDemographicsModalOpen] = useState(false);

  const { patient, isLoading } = usePatient();

  const {
    data: goalBundle,
    isLoading: goalsLoading,
    refetch: refetchGoals,
    isRefetching: goalsRefetching,
  } = api.goal.search.useQuery(
    {
      patient: patient!.id,
    },
    {
      enabled: patient != null,
    },
  );

  const utils = api.useUtils();
  const updatePatientMutation = api.patient.update.useMutation({
    onSuccess: async () => {
      await utils.patient.get.invalidate();
      setDemographicsModalOpen(false);
    },
    onError: () => {
      Alert.alert('Something went wrong');
    },
  });

  const onRefresh = useCallback(() => {
    refetchGoals().catch(() => Alert.alert('Error fetching goals'));
  }, [refetchGoals]);

  const handleDemographicsSave = useCallback(
    (form: DemographicsFormType) => {
      const raceExtension = getRaceExtension({ raceCodes: form.race });
      const ethnicityExtension = getEthnicityExtension({ ethnicityCodes: form.ethnicity });
      const genderIdentityExtension = getGenderIdentityExtension({
        genderCode: form.genderIdentity,
      });

      const newPatientExtension: Extension[] = [
        ...(patient?.extension?.filter(
          ({ url }) =>
            url !== RACE_EXTENSION_URL &&
            url !== ETHNICITY_EXTENSION_URL &&
            url !== GENDER_IDENTITY_EXTENSION_URL,
        ) ?? []),
        ...(raceExtension ? [raceExtension] : []),
        ...(ethnicityExtension ? [ethnicityExtension] : []),
        ...(genderIdentityExtension ? [genderIdentityExtension] : []),
      ];

      updatePatientMutation.mutate({
        id: patient!.id,
        resource: {
          ...patient,
          extension: newPatientExtension,
        },
      });
    },
    [patient, updatePatientMutation],
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
    <>
      <ScreenView>
        <KeyboardAwareScrollView
          className="h-full"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={goalsRefetching}
              onRefresh={onRefresh}
              tintColor={palette.coolGray[50]}
            />
          }
        >
          <View>
            <Text className="text-3xl" weight="bold">
              Healthcare Goals
            </Text>
            <View>
              {goalsLoading && <Skeleton className="bg-coolGray-200 h-10 w-full" />}
              {!goalsLoading && (goalBundle?.total ?? 0) > 0 ? (
                goalBundle?.entry
                  ?.filter(
                    ({ resource }) => getCodeFromConcept(resource.achievementStatus) !== 'achieved',
                  )
                  .map(({ resource: goal }) => (
                    <View key={goal.id} className="flex flex-row">
                      <MaterialCommunityIcons
                        name="format-quote-open"
                        size={36}
                        color={palette.cyan[300]}
                      />
                      <View className="self-end">
                        <Text className="text-lg">{goal.description.text}</Text>
                      </View>
                    </View>
                  ))
              ) : (
                <View className="flex h-24 w-full items-center justify-center">
                  <Text italic>No goals recorded</Text>
                </View>
              )}
              <View className="mt-8">
                <Button text="Add Goal" onPress={() => setGoalModalOpen(true)} />
              </View>
            </View>
          </View>
          <View className="mt-8 pb-24">
            <Text className="text-3xl" weight="bold">
              Demographics
            </Text>
            <View className="mt-4">
              <DemographicsInfo patient={patient} />
              <View className="mt-8">
                <Button text="Update Demographics" onPress={() => setDemographicsModalOpen(true)} />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScreenView>
      <AddGoalModal isOpen={goalModalOpen} onClose={() => setGoalModalOpen(false)} />
      <AddEditDemographicsModal
        isOpen={demographicsModalOpen}
        onClose={() => setDemographicsModalOpen(false)}
        onSubmit={handleDemographicsSave}
        patient={patient}
        isMutating={updatePatientMutation.isPending}
      />
    </>
  ) : null;
};

export default About;
