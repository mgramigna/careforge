import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getEthnicityCodes, getGenderIdentityCode, getRaceCodes } from '@/fhirpath/patient';
import {
  ETHNICITY_DISPLAY_TO_CODE,
  EthnicityCodeSchema,
  ethnicityOptions,
  GENDER_DISPLAY_TO_CODE,
  GenderCodeSchema,
  genderIdentityOptions,
  RACE_DISPLAY_TO_CODE,
  RaceCodeSchema,
  raceOptions,
} from '@/types/patient';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { type Patient } from '@careforge/canvas';

import { Button } from '../atoms/Button';
import { Checkbox } from '../atoms/Checkbox';
import { RadioButton } from '../atoms/RadioButton';
import { Text } from '../atoms/Text';

const DemographicsFormSchema = z.object({
  genderIdentity: GenderCodeSchema.optional(),
  race: RaceCodeSchema.array().optional(),
  ethnicity: EthnicityCodeSchema.array().optional(),
});

export type DemographicsFormType = z.infer<typeof DemographicsFormSchema>;

export const DemographicsForm = ({
  patient,
  onSubmit,
  onCancel,
  isMutating,
}: {
  patient: Patient;
  onSubmit: (form: DemographicsFormType) => void;
  onCancel: () => void;
  isMutating?: boolean;
}) => {
  const genderCode = getGenderIdentityCode(patient);
  const raceCodes = getRaceCodes(patient);
  const ethnicityCodes = getEthnicityCodes(patient);

  const {
    formState: { isValid },
    handleSubmit,
    control,
    watch,
  } = useForm<DemographicsFormType>({
    resolver: zodResolver(DemographicsFormSchema),
    defaultValues: {
      genderIdentity: genderCode,
      race: raceCodes,
      ethnicity: ethnicityCodes,
    },
  });

  const currentGender = watch('genderIdentity');

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} className="h-full">
      <Text className="text-3xl" weight="bold">
        Edit Demographics
      </Text>
      <View className="mt-8 flex gap-8">
        <Text className="text-xl">Gender</Text>
        <View className="flex flex-row flex-wrap gap-4">
          {genderIdentityOptions.map((option) => (
            <Controller
              key={option}
              control={control}
              name="genderIdentity"
              render={({ field: { onChange } }) => (
                <RadioButton
                  label={option}
                  selected={currentGender === GENDER_DISPLAY_TO_CODE[option]}
                  onPress={() => {
                    onChange(GENDER_DISPLAY_TO_CODE[option]);
                  }}
                />
              )}
            />
          ))}
        </View>
      </View>
      <View className="mt-8 flex gap-8">
        <Text className="text-xl">Race</Text>
        {raceOptions.map((option) => (
          <Controller
            key={option}
            control={control}
            name="race"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label={option}
                checked={value?.includes(RACE_DISPLAY_TO_CODE[option])}
                onPress={() => {
                  const code = RACE_DISPLAY_TO_CODE[option];
                  if (value?.includes(code)) {
                    const newValue = value ? [...value] : [];
                    newValue.splice(newValue.indexOf(code), 1);

                    onChange(newValue);
                  } else {
                    onChange([...(value ?? []), code]);
                  }
                }}
              />
            )}
          />
        ))}
      </View>
      <View className="mt-8 flex gap-8">
        <Text className="text-xl">Ethnicity</Text>
        {ethnicityOptions.map((option) => (
          <Controller
            key={option}
            control={control}
            name="ethnicity"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label={option}
                checked={value?.includes(ETHNICITY_DISPLAY_TO_CODE[option])}
                onPress={() => {
                  const code = ETHNICITY_DISPLAY_TO_CODE[option];
                  if (value?.includes(code)) {
                    const newValue = value ? [...value] : [];
                    newValue.splice(newValue.indexOf(code), 1);

                    onChange(newValue);
                  } else {
                    onChange([...(value ?? []), code]);
                  }
                }}
              />
            )}
          />
        ))}
      </View>
      <View className="mt-8 flex flex-row gap-8 pb-24">
        <View className="flex-1">
          <Button text="Cancel" variant="secondary" onPress={onCancel} />
        </View>
        <View className="flex-1">
          <Button
            disabled={!isValid}
            text="Save"
            onPress={handleSubmit(onSubmit)}
            isLoading={isMutating}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
