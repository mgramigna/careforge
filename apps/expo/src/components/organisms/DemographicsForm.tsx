import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { type Patient } from '@careforge/canvas';

import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';

const DemographicsFormSchema = z.object({});

export type DemographicsFormType = z.infer<typeof DemographicsFormSchema>;

export const DemographicsForm = ({
  patient: _patient,
  onSubmit,
  onCancel,
  isMutating,
}: {
  patient: Patient;
  onSubmit: (form: DemographicsFormType) => void;
  onCancel: () => void;
  isMutating?: boolean;
}) => {
  const {
    formState: { isValid },
    handleSubmit,
  } = useForm<DemographicsFormType>({
    resolver: zodResolver(DemographicsFormSchema),
    defaultValues: {},
  });

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} className="h-full">
      <Text className="text-3xl" weight="bold">
        Edit Demographics
      </Text>
      <View className="mt-8 flex gap-8">
        <Text>TODO</Text>
      </View>
      <View className="mt-8 flex flex-row gap-8">
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
