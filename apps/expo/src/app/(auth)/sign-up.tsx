import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { BasicInfo } from '@/components/templates/SignUp/BasicInfo';
import { Consents } from '@/components/templates/SignUp/Consents';
import { type BasicInfoFormType } from '@/components/templates/SignUp/types';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';
import { getCareTeamResource, getConsentToDisclose, getPatientResource } from '@/utils/fhir';
import { match } from 'ts-pattern';

type SignUpState = 'basic-info' | 'consents';

const SignUp = () => {
  const [signUpState, setSignUpState] = useState<SignUpState>('basic-info');
  const [createdPatientId, setCreatedPatientId] = useState<string>();

  const { signIn } = useAuth();

  const createCareteamMutation = api.careteam.update.useMutation({
    onSuccess: () => {
      setSignUpState('consents');
    },
    onError: (e) => {
      Alert.alert('Something went wrong');
      Alert.alert(e.message);
    },
  });

  const createConsentMutation = api.consent.create.useMutation({
    onSuccess: () => {
      signIn(createdPatientId!);
      router.replace('/home/');
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
        phoneNumber: basicInfo.phoneNumber,
      });

      createPatientMutation.mutate(patient);
    },
    [createPatientMutation],
  );

  const handleConsentsContinue = useCallback(() => {
    if (createdPatientId) {
      const consentResource = getConsentToDisclose({ patientId: createdPatientId });

      createConsentMutation.mutate(consentResource);
    }
  }, [createConsentMutation, createdPatientId]);

  return (
    <>
      <Stack.Screen options={{ gestureEnabled: signUpState === 'basic-info' }} />
      {match(signUpState)
        .with('basic-info', () => (
          <BasicInfo
            onContinue={handleBasicInfoContinue}
            isMutating={createPatientMutation.isPending}
          />
        ))
        .with('consents', () =>
          createdPatientId ? (
            <Consents
              onContinue={handleConsentsContinue}
              patientId={createdPatientId}
              isMutating={createConsentMutation.isPending}
            />
          ) : null,
        )
        .otherwise(() => null)}
    </>
  );
};

export default SignUp;
