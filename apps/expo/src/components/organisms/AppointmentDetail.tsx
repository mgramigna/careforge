import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { getLocation, getPractitionerId, getReason } from '@/fhirpath/appointment';
import { getPractitionerName } from '@/fhirpath/practitioner';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { HARDCODED_OFFICE_LOCATION_ID } from '@/utils/constants';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { type Appointment } from '@canvas-challenge/canvas';

import { Text } from '../atoms/Text';
import { AppointmentDetailModal } from '../molecules/AppointmentDetailModal';

export const AppointmentDetail = ({ appointment }: { appointment: Appointment }) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const {
    locationId: _locationId,
    practitionerId,
    reasonText: _reasonText,
  } = useMemo(() => {
    const locationId = getLocation(appointment);
    const practitionerId = getPractitionerId(appointment);
    const reasonText = getReason(appointment);

    return { locationId, practitionerId, reasonText };
  }, [appointment]);

  const { data: location } = api.location.get.useQuery(
    {
      // TODO: remove this when Canvas fixes bug with location IDs
      id: HARDCODED_OFFICE_LOCATION_ID,
    },
    {
      enabled: true,
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
          {dayJsStart.format('dddd MM/DD/YYYY')}
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
      <AppointmentDetailModal
        isOpen={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        appointment={appointment}
        location={location}
      />
    </>
  );
};