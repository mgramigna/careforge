import { useCallback } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { getLocationAddress } from '@/fhirpath/location';
import { getPractitionerName } from '@/fhirpath/practitioner';
import { usePractitioner } from '@/hooks/usePractitioner';
import { api } from '@/utils/api';
import { HARDCODED_OFFICE_LOCATION_ID } from '@/utils/constants';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { type Slot } from '@canvas-challenge/canvas';

import { Button } from '../atoms/Button';
import { RadioButton } from '../atoms/RadioButton';
import { Text } from '../atoms/Text';
import { TextInput } from '../atoms/TextInput';
import { ScreenView } from './ScreenView';

const ConfirmAppointmentFormSchema = z.object({
  reasonText: z.string().optional(),
  appointmentType: z.enum(['office', 'telehealth']),
});

type ConfirmAppointmentForm = z.infer<typeof ConfirmAppointmentFormSchema>;

export const ScheduleAppointmentModal = ({
  slot,
  isOpen,
  onClose,
  onConfirm,
  practitionerId,
  isConfirming,
}: {
  isConfirming?: boolean;
  practitionerId: string;
  slot: Slot;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (appointmentType: 'office' | 'telehealth', reasonText?: string) => void;
}) => {
  const { practitioner, isLoading } = usePractitioner(practitionerId);

  const { data: location } = api.location.get.useQuery({
    // TODO: remove this when Canvas fixes bug with location IDs
    id: HARDCODED_OFFICE_LOCATION_ID,
  });

  const onSubmit = useCallback(
    (form: ConfirmAppointmentForm) => {
      onConfirm(form.appointmentType, form.reasonText === '' ? undefined : form.reasonText);
    },
    [onConfirm],
  );

  const {
    formState: { isValid },
    control,
    handleSubmit,
    watch,
  } = useForm<ConfirmAppointmentForm>({
    defaultValues: {
      appointmentType: 'office',
      reasonText: '',
    },
  });

  const appointmentType = watch('appointmentType');

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ScreenView>
        <View className="flex h-full">
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <View>
                <Text className="text-3xl" weight="bold">
                  Confirm Your Appointment
                </Text>
                <Text className="mt-8 text-xl">
                  <Text weight="bold">{dayjs(slot.start).format('ddd MMM DD, YYYY')}</Text> from{' '}
                  <Text weight="bold">
                    {dayjs(slot.start).format('hh:mm')} - {dayjs(slot.end).format('hh:mm a')}
                  </Text>{' '}
                  with{' '}
                  <Text weight="bold">
                    {practitioner ? getPractitionerName(practitioner) : 'Your Care Team'}
                  </Text>
                </Text>
              </View>
              <View className="mt-8">
                <Text className="mb-2 pl-1 text-xl">
                  In a few words, tell us what you'd like to focus on in your appointment (E.g.
                  "general check up", "back pain")
                </Text>
                <Controller
                  control={control}
                  name="reasonText"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Enter reason for visit..."
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      multiline
                      className="h-24"
                    />
                  )}
                />
              </View>
              <View className="mt-8">
                <Text className="mb-2 pl-1 text-xl">
                  Would you prefer an office visit in the clinic, or a telehealth visit?
                </Text>
                <View className="flex flex-row justify-evenly">
                  <Controller
                    control={control}
                    name="appointmentType"
                    render={({ field: { onChange } }) => (
                      <RadioButton
                        label="Office"
                        onPress={() => onChange('office')}
                        selected={appointmentType === 'office'}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="appointmentType"
                    render={({ field: { onChange } }) => (
                      <RadioButton
                        label="Telehealth"
                        onPress={() => onChange('telehealth')}
                        selected={appointmentType === 'telehealth'}
                      />
                    )}
                  />
                </View>
              </View>
              {location && appointmentType === 'office' && (
                <View className="mt-2">
                  <Text className="text-center">{getLocationAddress(location)}</Text>
                </View>
              )}
              <View className="mt-8 flex gap-4">
                <Button
                  text="Confirm Appointment"
                  onPress={handleSubmit(onSubmit)}
                  disabled={!isValid}
                  isLoading={isConfirming}
                />
                <Button variant={'secondary'} text="Cancel" onPress={onClose} />
              </View>
            </>
          )}
        </View>
      </ScreenView>
    </Modal>
  );
};
