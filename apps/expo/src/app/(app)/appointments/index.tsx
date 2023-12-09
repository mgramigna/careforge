import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { SlotDetail } from '@/components/organisms/SlotDetail';
import { useAuth } from '@/context/AuthContext';
import { getPractitionerFromCareTeam } from '@/fhirpath/careteam';
import { getPractitionerIdFromSchedule } from '@/fhirpath/schedule';
import { api } from '@/utils/api';
import dayjs from 'dayjs';

import { type Slot } from '@canvas-challenge/canvas';

function groupSlots(slots: Slot[]): Map<string, Slot[]> {
  const res = new Map<string, Slot[]>();

  slots.forEach((slot) => {
    const dayOfStart = dayjs(slot.start).startOf('day').toISOString();
    if (res.has(dayOfStart)) {
      res.get(dayOfStart)!.push(slot);
    } else {
      res.set(dayOfStart, [slot]);
    }
  });

  return res;
}

const Appointments = () => {
  const { patientId } = useAuth();
  const [appointmentSearchStart, _setAppointmentSearchStart] = useState(
    dayjs('2023-12-11T00:00:00.0Z'),
  );

  const { data: patientCareteam } = api.careteam.search.useQuery(
    {
      patient: patientId!,
    },
    {
      enabled: !!patientId,
    },
  );

  const practitionerId = useMemo(() => {
    if (patientCareteam?.entry?.at(0)?.resource) {
      return getPractitionerFromCareTeam(patientCareteam.entry.at(0)!.resource);
    }

    return null;
  }, [patientCareteam]);

  const { data: scheduleSearchResult } = api.schedule.search.useQuery();

  const scheduleId = useMemo(() => {
    const matchingSchedule = scheduleSearchResult?.entry?.find(
      ({ resource }) => getPractitionerIdFromSchedule(resource) === practitionerId,
    )?.resource;

    return matchingSchedule?.id;
  }, [practitionerId, scheduleSearchResult]);

  const { data: slots, isLoading: slotsLoading } = api.slot.search.useQuery(
    {
      schedule: scheduleId!,
      start: appointmentSearchStart.startOf('day').toISOString(),
      end: appointmentSearchStart.endOf('day').toISOString(),
    },
    {
      enabled: !!scheduleId,
    },
  );

  const groupedSlots = useMemo(() => {
    return groupSlots(slots?.entry?.map(({ resource }) => resource) ?? []);
  }, [slots]);

  return patientId && practitionerId ? (
    <ScreenView>
      {slotsLoading && <ActivityIndicator />}
      <View className="h-full">
        {[...groupedSlots.entries()].map(([startDayISO, slots]) => (
          <View key={startDayISO}>
            <Text className="pb-8 text-center text-3xl" weight="bold">
              {dayjs(startDayISO).format('dddd MM/DD/YYYY')}
            </Text>
            <FlatList
              data={slots}
              keyExtractor={(slot) => `${slot.start}-${slot.end}`}
              renderItem={({ item: slot }) => (
                <View className="my-2">
                  <SlotDetail slot={slot} patientId={patientId} practitionerId={practitionerId} />
                </View>
              )}
            />
          </View>
        ))}
      </View>
    </ScreenView>
  ) : null;
};

export default Appointments;
