import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Link } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { RadioButton } from '@/components/atoms/RadioButton';
import { Text } from '@/components/atoms/Text';
import { TextInput } from '@/components/atoms/TextInput';
import { InputLabel } from '@/components/molecules/InputLabel';
import { ScreenView } from '@/components/molecules/ScreenView';
import { palette } from '@/theme/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';

import { BasicInfoFormSchema, genderOptions, type BasicInfoFormType } from './types';

export const BasicInfo = ({
  onContinue,
  isMutating,
}: {
  isMutating?: boolean;
  onContinue: (form: BasicInfoFormType) => void;
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    getFieldState,
  } = useForm<BasicInfoFormType>({
    resolver: zodResolver(BasicInfoFormSchema),
    mode: 'onChange',
  });

  const currentBirthDate = watch('dateOfBirth');
  const dobState = getFieldState('dateOfBirth');
  const currentGender = watch('gender');

  const onSubmit = useCallback(
    (form: BasicInfoFormType) => {
      onContinue(form);
    },
    [onContinue],
  );

  return (
    <ScreenView>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} className="h-full">
        <Text className="text-3xl" weight="bold">
          Sign Up
        </Text>
        <View className="mt-8 flex gap-8">
          <View>
            <InputLabel label="First Name" required />
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  hasError={!!errors.firstName}
                  placeholder="Enter first name..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <View>
            <InputLabel label="Last Name" required />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  hasError={!!errors.lastName}
                  placeholder="Enter last name..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <View>
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
                  placeholder="Enter email..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <View>
            <InputLabel label="Phone Number" required />
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  hasError={!!errors.phoneNumber}
                  textContentType="telephoneNumber"
                  keyboardType="number-pad"
                  autoComplete="tel"
                  placeholder="Enter phone number..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <View>
            <InputLabel label="Date of Birth" required />
            <TouchableOpacity onPress={() => setDatePickerOpen((curr) => !curr)}>
              {!dobState.isDirty ? (
                <Text className="bg-coolGray-600 border-coolGray-300 text-coolGray-200 rounded-md border p-6">
                  __ / __ / ____
                </Text>
              ) : (
                <Text className="bg-coolGray-600 border-coolGray-300 rounded-md border p-6">
                  {dayjs(currentBirthDate).format('MM/DD/YYYY')}
                </Text>
              )}
            </TouchableOpacity>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <DateTimePickerModal
                  textColor={palette.coolGray[50]}
                  pickerComponentStyleIOS={{
                    backgroundColor: palette.coolGray[700],
                  }}
                  pickerContainerStyleIOS={{ backgroundColor: palette.coolGray[700] }}
                  isVisible={datePickerOpen}
                  buttonTextColorIOS={palette.pink[300]}
                  date={value}
                  mode="date"
                  onConfirm={(date) => {
                    onChange(date);
                    setDatePickerOpen(false);
                  }}
                  onCancel={() => setDatePickerOpen(false)}
                  maximumDate={dayjs().add(-18, 'years').toDate()}
                />
              )}
            />
          </View>
          <View>
            <InputLabel label="Gender" required />
            <View className="flex flex-row justify-evenly">
              {genderOptions.map((gender) => (
                <Controller
                  key={gender}
                  control={control}
                  name="gender"
                  render={({ field: { onChange } }) => (
                    <RadioButton
                      label={gender}
                      onPress={() => onChange(gender)}
                      selected={currentGender === gender}
                    />
                  )}
                />
              ))}
            </View>
          </View>
        </View>
        <View className="mt-8 flex flex-row gap-8 pb-24">
          <View className="flex-1">
            <Link href=".." asChild>
              <Button text="Back" variant="secondary" />
            </Link>
          </View>
          <View className="flex-1">
            <Button
              disabled={!isValid}
              text="Continue"
              onPress={handleSubmit(onSubmit)}
              isLoading={isMutating}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenView>
  );
};
