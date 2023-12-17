import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { DemographicsFormSchema, genderOptions, type DemographicsFormType } from './types';

export const Demographics = ({
  onContinue,
  onBack,
}: {
  onContinue: (form: DemographicsFormType) => void;
  onBack: () => void;
}) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    watch,
  } = useForm<DemographicsFormType>({
    resolver: zodResolver(DemographicsFormSchema),
    mode: 'onChange',
  });

  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(
    (form: DemographicsFormType) => {
      onContinue(form);
    },
    [onContinue],
  );

  const t = watch('gender');

  return (
    <ScreenView>
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <Text className="text-3xl" weight="bold">
          Demographics {t}
        </Text>
        <Controller
          name="gender"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DropDownPicker
              open={open}
              value={value}
              items={genderOptions.map((option) => ({ label: option, value: option }))}
              setOpen={setOpen}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              setValue={() => {}}
              onSelectItem={(item) => onChange(item.value)}
              placeholder="Gender"
              listMode="SCROLLVIEW"
            />
          )}
        />
        <Button disabled={!isValid} text="Continue" onPress={handleSubmit(onSubmit)} />
        <Button text="Back" variant="secondary" onPress={onBack} />
      </ScrollView>
    </ScreenView>
  );
};
