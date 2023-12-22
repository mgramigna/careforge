import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from '@/components/atoms/Text';
import { getMedicationDisplay } from '@/fhirpath/medication';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../atoms/Button';
import { TextInput } from '../atoms/TextInput';
import { InputLabel } from '../molecules/InputLabel';

const MedicationFormSchema = z.object({
  medicationResourceId: z.string(),
  dosageText: z.string(),
  timingText: z.string(),
});

export type MedicationFormType = z.infer<typeof MedicationFormSchema>;

export const MedicationForm = ({
  onSubmit,
  onCancel,
  isMutating,
}: {
  onSubmit: (form: MedicationFormType) => void;
  onCancel: () => void;
  isMutating?: boolean;
}) => {
  const utils = api.useUtils();

  const [suggestionsList, setSuggestionsList] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm<MedicationFormType>({
    resolver: zodResolver(MedicationFormSchema),
  });

  const getSuggestions = useCallback(
    async (q: string) => {
      if (typeof q !== 'string' || q.length < 3) {
        return;
      }
      setLoading(true);

      const result = await utils.client.medication.search.query({
        _text: q.toLowerCase(),
      });

      const suggestions =
        result?.entry?.map(({ resource }) => ({
          id: resource.id,
          title: getMedicationDisplay(resource) ?? '',
        })) ?? [];

      setSuggestionsList(suggestions);
      setLoading(false);
    },
    [utils],
  );

  const onClearPress = useCallback(() => {
    setSuggestionsList([]);
  }, []);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} className="h-full">
      <Text className="text-3xl" weight="bold">
        Add Medication
      </Text>
      <View className="mt-8 flex gap-8">
        <View>
          <InputLabel label="Medication" required />
          <Controller
            control={control}
            name="medicationResourceId"
            render={({ field: { onChange, onBlur, value } }) => (
              <AutocompleteDropdown
                textInputProps={{
                  className: 'bg-coolGray-600 text-coolGray-50',
                }}
                rightButtonsContainerStyle={{
                  backgroundColor: palette.coolGray[600],
                }}
                containerStyle={{
                  backgroundColor: palette.coolGray[600],
                }}
                dataSet={suggestionsList}
                onBlur={onBlur}
                onChangeText={getSuggestions}
                initialValue={value}
                onSelectItem={(item) => {
                  if (item) onChange(item.id);
                }}
                debounce={600}
                onClear={onClearPress}
                loading={loading}
                useFilter={false}
                closeOnBlur={false}
                inputContainerStyle={{}}
                suggestionsListTextStyle={{
                  fontFamily: 'OpenSans_400Regular',
                  color: palette.coolGray[50],
                }}
                suggestionsListContainerStyle={{
                  marginTop: -124,
                  backgroundColor: palette.coolGray[800],
                }}
              />
            )}
          />
        </View>
        <View>
          <InputLabel label="How much are you taking?" required />
          <Controller
            control={control}
            name="dosageText"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                hasError={!!errors.dosageText}
                placeholder="Enter dosage"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View>
          <InputLabel label="How often are you taking it?" required />
          <Controller
            control={control}
            name="timingText"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                hasError={!!errors.timingText}
                placeholder="Enter timing"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
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
