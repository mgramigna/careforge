import React from 'react';
import { FlatList, View } from 'react-native';

import { type Appointment } from '@careforge/canvas';

import { AppointmentDetail } from './AppointmentDetail';

export const HomeAppointmentList = ({ appointments }: { appointments: Appointment[] }) => {
  return (
    <View className="w-full">
      <FlatList
        scrollEnabled={false}
        keyExtractor={(appointment) => appointment.id}
        data={appointments}
        renderItem={({ item: appointment }) => (
          <View className="my-2">
            <AppointmentDetail appointment={appointment} />
          </View>
        )}
      />
    </View>
  );
};
