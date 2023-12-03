import React from 'react';
import { View } from 'react-native';

import { type Appointment } from '@canvas-challenge/canvas';

import { Text } from '../atoms/Text';
import { AppointmentDetail } from '../molecules/AppointmentDetail';

export const HomeAppointmentList = ({ appointments }: { appointments: Appointment[] }) => {
  return (
    <View className="w-full">
      <Text className="text-2xl">Appointments</Text>
      <View className="flex flex-col gap-y-8">
        {appointments.map((appointment) => (
          <View key={appointment.id} className="w-full">
            <AppointmentDetail appointment={appointment} />
          </View>
        ))}
      </View>
    </View>
  );
};
