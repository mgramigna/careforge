import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { api } from '@/utils/api';
import { getAppointmentResource } from '@/utils/fhir';
import dayjs from 'dayjs';

import { type Slot } from '@careforge/canvas';

import { Button } from '../atoms/Button';
import { ScheduleAppointmentModal } from '../molecules/ScheduleAppointmentModal';

export const SlotDetail = ({
  slot,
  patientId,
  practitionerId,
}: {
  slot: Slot;
  patientId: string;
  practitionerId: string;
}) => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const utils = api.useUtils();
  const createAppointment = api.appointment.create.useMutation({
    onSuccess: async () => {
      await utils.appointment.search.invalidate();
      await utils.appointment.get.invalidate();
      setScheduleModalOpen(false);
    },
  });

  const handleAppointmentConfirm = useCallback(
    (appointmentType: 'office' | 'telehealth', reasonText?: string) => {
      const appointment = getAppointmentResource({
        practitionerId,
        patientId,
        appointmentType,
        reasonText,
        start: slot.start,
        end: slot.end,
      });

      createAppointment.mutate(appointment);
    },
    [slot, createAppointment, practitionerId, patientId],
  );

  return (
    <>
      <View className="">
        <Button
          className="w-full"
          text={`${dayjs(slot.start).format('hh:mm ')} - ${dayjs(slot.end).format('hh:mm a')}`}
          onPress={() => setScheduleModalOpen(true)}
        />
      </View>
      <ScheduleAppointmentModal
        practitionerId={practitionerId}
        isConfirming={createAppointment.status === 'pending'}
        onConfirm={handleAppointmentConfirm}
        onClose={() => setScheduleModalOpen(false)}
        isOpen={scheduleModalOpen}
        slot={slot}
      />
    </>
  );
};
