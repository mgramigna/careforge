import React, { useCallback, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { TextInput } from '@/components/atoms/TextInput';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';

import { type PatientBundle } from '@canvas-challenge/canvas';

const SignIn = () => {
  const { signIn, patientId } = useAuth();
  const [email, setEmail] = useState('');

  const { isLoading: patientSearchLoading, refetch } = api.patient.search.useQuery(
    {
      email,
    },
    {
      enabled: false,
    },
  );

  const checkForValidSignIn = useCallback(
    (bundle?: PatientBundle | null) => {
      const result = bundle?.entry?.at(0)?.resource;

      if (result) {
        signIn(result.id);
      }
    },
    [signIn],
  );

  const searchForPatient = useCallback(() => {
    refetch()
      .then((result) => checkForValidSignIn(result.data))
      .catch(console.error);
  }, [refetch, checkForValidSignIn]);

  if (patientId) {
    return <Redirect href="/" />;
  }

  return (
    <ScreenView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="h-full">
          <>
            <Text className="mt-12 text-center text-5xl">App Name TBD</Text>
            <Text className="text-coolGray-400 mt-4 text-center text-lg">
              Log in to start owning your health data
            </Text>
            <View className="mt-28">
              <TextInput
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email..."
                onSubmitEditing={searchForPatient}
              />
              <View className="mt-10">
                <Button isLoading={patientSearchLoading} text="Login" onPress={searchForPatient} />
              </View>
              <View className="mt-10">
                <Text className="text-xl">
                  Need an account?{' '}
                  <Link href="/sign-up" asChild>
                    <Text className="text-pink-300">Sign up</Text>
                  </Link>
                </Text>
              </View>
            </View>
          </>
        </View>
      </TouchableWithoutFeedback>
    </ScreenView>
  );
};

export default SignIn;
