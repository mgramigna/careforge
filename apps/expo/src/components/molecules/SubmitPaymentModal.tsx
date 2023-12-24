import { Modal, ScrollView, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { TextInput } from '../atoms/TextInput';
import { InputLabel } from './InputLabel';
import { ScreenView } from './ScreenView';

const PaymentFormSchema = z.object({
  amount: z.string().regex(/^\$?[0-9]+(\.[0-9][0-9])?$/, 'Please enter a valid dollar amount'),
});

export type PaymentFormType = z.infer<typeof PaymentFormSchema>;

export const SubmitPaymentModal = ({
  isOpen,
  onClose,
  onSubmit,
  isMutating,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: PaymentFormType) => void;
  isMutating?: boolean;
}) => {
  const {
    handleSubmit,
    formState: { isValid, errors },
    control,
  } = useForm<PaymentFormType>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      amount: '',
    },
  });

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ScreenView>
        <ScrollView className="h-full">
          <View>
            <Text weight="bold" className="mb-4 text-3xl">
              Submit Payment
            </Text>
          </View>
          <View className="mt-12">
            <InputLabel label="Amount (USD)" required />
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="decimal-pad"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  hasError={!!errors.amount}
                />
              )}
            />
            <Text className="text-red-200">{errors.amount?.message}</Text>
          </View>
          <View className="mt-8 flex flex-row gap-8">
            <View className="flex-1">
              <Button text="Close" variant="secondary" onPress={onClose} />
            </View>
            <View className="flex-1">
              <Button
                text="Submit Payment"
                disabled={!isValid}
                onPress={handleSubmit(onSubmit)}
                isLoading={isMutating}
              />
            </View>
          </View>
        </ScrollView>
      </ScreenView>
    </Modal>
  );
};
