import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Stack } from 'expo-router';
import { BasicInfo } from '@/components/templates/SignUp/BasicInfo';
import { Complete } from '@/components/templates/SignUp/Complete';
import { Demographics } from '@/components/templates/SignUp/Demographics';
import {
  type BasicInfoFormType,
  type DemographicsFormType,
} from '@/components/templates/SignUp/types';
import { api } from '@/utils/api';
import { getPatientResource } from '@/utils/fhir';
import { match } from 'ts-pattern';

interface OverallSignUpForm {
  basicInfo?: BasicInfoFormType;
  demographics?: DemographicsFormType;
}

type SignUpState = 'basic-info' | 'demographics' | 'consents' | 'done';

const SignUp = () => {
  const [formState, setFormState] = useState<OverallSignUpForm>({});
  const [signUpState, setSignUpState] = useState<SignUpState>('basic-info');
  const [createdPatientId, _setCreatedPatientId] = useState<string>();

  const createPatientMutation = api.patient.create.useMutation({
    onSuccess: () => {
      setSignUpState('consents');
    },
    onError: () => {
      Alert.alert('Something went wrong');
    },
  });

  const handleBasicInfoContinue = useCallback((basicInfo: BasicInfoFormType) => {
    setFormState((current) => ({ ...current, basicInfo: { ...basicInfo } }));
    setSignUpState('demographics');
  }, []);

  const handleDemographicsContinue = useCallback(
    (demographics: DemographicsFormType) => {
      setFormState((current) => ({ ...current, demographics: { ...demographics } }));

      if (formState.basicInfo) {
        const patient = getPatientResource({
          firstName: formState.basicInfo.firstName,
          lastName: formState.basicInfo.lastName,
          dateOfBirth: formState.basicInfo.dateOfBirth,
          gender: demographics.gender,
          email: formState.basicInfo.email,
        });

        createPatientMutation.mutate(patient);
      }
    },
    [formState, createPatientMutation],
  );

  return (
    <>
      <Stack.Screen />
      {match(signUpState)
        .with('basic-info', () => <BasicInfo onContinue={handleBasicInfoContinue} />)
        .with('demographics', () => (
          <Demographics
            onContinue={handleDemographicsContinue}
            onBack={() => setSignUpState('basic-info')}
            isMutating={createPatientMutation.isPending}
          />
        ))
        .with('done', () => <Complete patientId={createdPatientId!} />)
        .otherwise(() => null)}
    </>
  );
};

export default SignUp;
