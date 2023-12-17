import React, { useCallback, useState } from 'react';
import { Stack } from 'expo-router';
import { BasicInfo } from '@/components/templates/SignUp/BasicInfo';
import { Complete } from '@/components/templates/SignUp/Complete';
import { Demographics } from '@/components/templates/SignUp/Demographics';
import {
  type BasicInfoFormType,
  type DemographicsFormType,
} from '@/components/templates/SignUp/types';
import { match } from 'ts-pattern';

interface OverallSignUpForm {
  basicInfo?: BasicInfoFormType;
  demographics?: DemographicsFormType;
}

type SignUpState = 'basic-info' | 'demographics' | 'consents' | 'done';

const SignUp = () => {
  const [_formState, setFormState] = useState<OverallSignUpForm>({});
  const [signUpState, setSignUpState] = useState<SignUpState>('basic-info');
  const [createdPatientId, _setCreatedPatientId] = useState<string>();

  const handleBasicInfoContinue = useCallback((basicInfo: BasicInfoFormType) => {
    setFormState((current) => ({ ...current, basicInfo: { ...basicInfo } }));
    setSignUpState('demographics');
  }, []);

  const handleDemographicsContinue = useCallback((demographics: DemographicsFormType) => {
    setFormState((current) => ({ ...current, demographics: { ...demographics } }));
    setSignUpState('consents');
  }, []);

  return (
    <>
      <Stack.Screen />
      {match(signUpState)
        .with('basic-info', () => <BasicInfo onContinue={handleBasicInfoContinue} />)
        .with('demographics', () => (
          <Demographics
            onContinue={handleDemographicsContinue}
            onBack={() => setSignUpState('basic-info')}
          />
        ))
        .with('done', () => <Complete patientId={createdPatientId!} />)
        .otherwise(() => null)}
    </>
  );
};

export default SignUp;
