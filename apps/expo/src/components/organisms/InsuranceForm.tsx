import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getGroupId, getPayorId, getPayorName } from '@/fhirpath/coverage';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { type Coverage } from '@careforge/canvas';

import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { TextInput } from '../atoms/TextInput';

const InsuranceFormSchema = z.object({
  payorId: z.string(),
  memberId: z.string(),
  groupId: z.string().optional(),
  coverageStartDate: z.date(),
});

export type InsuranceFormType = z.infer<typeof InsuranceFormSchema>;

export const InsuranceForm = ({
  existingInsurance,
  onSubmit,
  onCancel,
  isMutating,
}: {
  existingInsurance?: Coverage;
  onSubmit: (form: InsuranceFormType) => void;
  onCancel: () => void;
  isMutating?: boolean;
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState<{ id: string; title: string }[]>(
    existingInsurance
      ? [
          {
            id: getPayorId(existingInsurance),
            title: getPayorName(existingInsurance),
          },
        ]
      : [],
  );
  const [loading, setLoading] = useState(false);

  const utils = api.useUtils();

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
    watch,
  } = useForm<InsuranceFormType>({
    resolver: zodResolver(InsuranceFormSchema),
    defaultValues: {
      payorId: existingInsurance ? getPayorId(existingInsurance) : undefined,
      groupId: existingInsurance ? getGroupId(existingInsurance) : undefined,
      memberId: existingInsurance ? existingInsurance.subscriberId : undefined,
      coverageStartDate: existingInsurance?.period?.start
        ? dayjs(existingInsurance.period.start).toDate()
        : new Date(),
    },
  });

  const currentCoverageStartDate = watch('coverageStartDate');

  const getSuggestions = useCallback(
    async (q: string) => {
      if (typeof q !== 'string' || q.length < 3) {
        return;
      }
      setLoading(true);
      const result = await utils.client.organization.search.query({
        name: q,
      });

      const suggestions =
        result?.entry?.map(({ resource }) => ({
          id: resource.id,
          title: resource.name,
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
        {existingInsurance ? 'Edit' : 'Add'} Insurance
      </Text>
      <View className="mt-8 flex gap-8">
        <View>
          <Text className="mb-2 pl-1 text-xl">
            Insurance Provider<Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="payorId"
            render={({ field: { onChange, onBlur, value } }) => (
              <AutocompleteDropdown
                textInputProps={{
                  className: 'bg-coolGray-100',
                }}
                rightButtonsContainerStyle={{
                  backgroundColor: palette.coolGray[100],
                }}
                containerStyle={{
                  backgroundColor: palette.coolGray[100],
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
                }}
                suggestionsListContainerStyle={{
                  marginTop: -64,
                  backgroundColor: palette.coolGray[50],
                }}
              />
            )}
          />
        </View>
        <View>
          <Text className="mb-2 pl-1 text-xl">
            Member ID<Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="memberId"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                hasError={!!errors.memberId}
                placeholder="Enter Member ID..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View>
          <Text className="mb-2 pl-1 text-xl">Group ID</Text>
          <Controller
            control={control}
            name="groupId"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                hasError={!!errors.groupId}
                placeholder="Enter Group ID"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View>
          <Text className="mb-2 pl-1 text-xl">
            Coverage Start Date<Text className="text-red-500">*</Text>
          </Text>
          <TouchableOpacity onPress={() => setDatePickerOpen((curr) => !curr)}>
            <Text className="bg-coolGray-100 border-coolGray-300 rounded-md border p-6">
              {dayjs(currentCoverageStartDate).format('MM/DD/YYYY')}
            </Text>
          </TouchableOpacity>
          <Controller
            control={control}
            name="coverageStartDate"
            render={({ field: { onChange, value } }) => (
              <DateTimePickerModal
                textColor={palette.coolGray[900]}
                pickerContainerStyleIOS={{ backgroundColor: palette.coolGray[50] }}
                isVisible={datePickerOpen}
                buttonTextColorIOS={palette.pink[500]}
                date={value}
                mode="date"
                onConfirm={(date) => {
                  onChange(date);
                  setDatePickerOpen(false);
                }}
                onCancel={() => setDatePickerOpen(false)}
                maximumDate={dayjs().toDate()}
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
