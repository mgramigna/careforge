import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Stack } from 'expo-router';
import { BasicInfo } from '@/components/templates/SignUp/BasicInfo';
import { Complete } from '@/components/templates/SignUp/Complete';
import { Consents } from '@/components/templates/SignUp/Consents';
import { type BasicInfoFormType } from '@/components/templates/SignUp/types';
import { api } from '@/utils/api';
import { getCareTeamResource, getPatientResource } from '@/utils/fhir';
import { match } from 'ts-pattern';

type SignUpState = 'basic-info' | 'consents' | 'done';

const SignUp = () => {
  const [signUpState, setSignUpState] = useState<SignUpState>('basic-info');
  const [createdPatientId, setCreatedPatientId] = useState<string>();

  const createCareteamMutation = api.careteam.update.useMutation({
    onSuccess: () => {
      setSignUpState('consents');
    },
    onError: (e) => {
      Alert.alert('Something went wrong');
      Alert.alert(e.message);
    },
  });

  const createCareteamForNewPatient = useCallback(
    (patientId: string) => {
      const careteamResource = getCareTeamResource({ patientId });

      createCareteamMutation.mutate({ resource: careteamResource, id: careteamResource.id });
    },
    [createCareteamMutation],
  );

  const createPatientMutation = api.patient.create.useMutation({
    onSuccess: (patientId) => {
      setSignUpState('consents');
      setCreatedPatientId(patientId);
      createCareteamForNewPatient(patientId);
    },
    onError: (e) => {
      Alert.alert('Something went wrong');
      Alert.alert(e.message);
    },
  });

  const handleBasicInfoContinue = useCallback(
    (basicInfo: BasicInfoFormType) => {
      const patient = getPatientResource({
        firstName: basicInfo.firstName,
        lastName: basicInfo.lastName,
        dateOfBirth: basicInfo.dateOfBirth,
        gender: basicInfo.gender,
        email: basicInfo.email,
      });

      createPatientMutation.mutate(patient);
    },
    [createPatientMutation],
  );

  return (
    <>
      <Stack.Screen />
      {match(signUpState)
        .with('basic-info', () => (
          <BasicInfo
            onContinue={handleBasicInfoContinue}
            isMutating={createPatientMutation.isPending}
          />
        ))
        .with('consents', () => <Consents onContinue={() => setSignUpState('done')} />)
        .with('done', () => <Complete patientId={createdPatientId!} />)
        .otherwise(() => null)}
    </>
  );
};

export default SignUp;
