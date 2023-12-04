import React, { useCallback, useMemo, useState } from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { getLocation, getPractitionerId, getReason } from '@/fhirpath/appointment';
import { getPractitionerName } from '@/fhirpath/practitioner';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { type Appointment } from '@canvas-challenge/canvas';

import { Text } from '../atoms/Text';

export const AppointmentDetail = ({ appointment }: { appointment: Appointment }) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const {
    locationId,
    practitionerId,
    reasonText: _reasonText,
  } = useMemo(() => {
    const locationId = getLocation(appointment);
    const practitionerId = getPractitionerId(appointment);
    const reasonText = getReason(appointment);

    return { locationId, practitionerId, reasonText };
  }, [appointment]);

  const { data: _location } = api.location.get.useQuery(
    {
      id: locationId!,
    },
    {
      enabled: !!locationId,
    },
  );

  const { data: practitioner } = api.practitioner.get.useQuery(
    {
      id: practitionerId!,
    },
    {
      enabled: !!practitionerId,
    },
  );

  const renderAppointmentDate = useCallback(({ start, end }: { start: string; end: string }) => {
    const dayJsStart = dayjs(start);
    const dayJsEnd = dayjs(end);

    return (
      <>
        <Text weight="bold" className="text-2xl">
          {dayJsStart.format('dddd DD/MM/YYYY')}
        </Text>
        <Text className="text-lg">
          from{' '}
          <Text weight="bold">
            {dayJsStart.format('hh:mm')} - {dayJsEnd.format('hh:mm a')}
          </Text>
        </Text>
      </>
    );
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setDetailModalVisible(true);
        }}
      >
        <View className="bg-coolGray-100 border-coolGray-300 rounded-md border px-12 py-4">
          <View className="absolute left-2 top-2 w-12">
            <Ionicons name="calendar" size={36} color={palette.cyan[800]} />
          </View>
          <View className="ml-4">
            {appointment.start &&
              appointment.end &&
              renderAppointmentDate({
                start: appointment.start,
                end: appointment.end,
              })}
            <Text className="text-lg">
              with <Text>{practitioner ? getPractitionerName(practitioner) : ''}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={detailModalVisible}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setDetailModalVisible(false);
        }}
      >
        <SafeAreaView>
          <View className="bg-coolGray-50 h-screen">
            <Text>TODO</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};
