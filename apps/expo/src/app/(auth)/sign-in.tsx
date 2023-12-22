import React, { useCallback } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Link, Redirect } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { TextInput } from '@/components/atoms/TextInput';
import { InputLabel } from '@/components/molecules/InputLabel';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { type PatientBundle } from '@careforge/canvas';

const SignInFormSchema = z.object({
  email: z.string().email().min(1),
});

type SignInFormType = z.infer<typeof SignInFormSchema>;

const SignIn = () => {
  const { signIn, patientId } = useAuth();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<SignInFormType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(SignInFormSchema),
    mode: 'onChange',
  });

  const email = watch('email');

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
      } else {
        Alert.alert('Unable to locate account with that email address');
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
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} className="h-full">
          <>
            <Text className="mt-12 text-center text-6xl" heading>
              Careforge
            </Text>
            <Text className="text-coolGray-200 mt-4 text-center text-lg">
              Log in to start owning your health data
            </Text>
            <View className="mt-28">
              <InputLabel label="Email" required />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    hasError={!!errors.email}
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoComplete="email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email..."
                  />
                )}
              />
              <View className="mt-10">
                <Button
                  disabled={!isValid}
                  isLoading={patientSearchLoading}
                  text="Login"
                  onPress={handleSubmit(searchForPatient)}
                />
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
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </ScreenView>
  );
};

export default SignIn;
