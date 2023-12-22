import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { SlotDetail } from '@/components/organisms/SlotDetail';
import { useAuth } from '@/context/AuthContext';
import { getPractitionerFromCareTeam } from '@/fhirpath/careteam';
import { getPractitionerIdFromSchedule } from '@/fhirpath/schedule';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

const Appointments = () => {
  const { patientId } = useAuth();
  const [appointmentSearchStart, setAppointmentSearchStart] = useState(dayjs().add(1, 'days'));
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  return patientId && practitionerId ? (
    <ScreenView>
      <View className="h-full pb-36">
        <View>
          <Text className="text-3xl" weight="bold">
            Schedule an Appointment
          </Text>
        </View>
        <View className="mt-12">
          <View className="flex flex-row items-center justify-center pb-8">
            <Modal
              animationType="slide"
              visible={showDatePicker}
              presentationStyle="pageSheet"
              onRequestClose={() => setShowDatePicker(false)}
            >
              <ScreenView>
                <View className="h-full">
                  <DateTimePicker
                    value={appointmentSearchStart}
                    onValueChange={(date) => {
                      setAppointmentSearchStart(dayjs(date).startOf('day'));
                      setShowDatePicker(false);
                    }}
                    mode="date"
                    selectedItemColor={palette.pink[500]}
                    headerTextStyle={{
                      color: palette.coolGray[50],
                    }}
                    calendarTextStyle={{
                      color: palette.coolGray[50],
                    }}
                    weekDaysTextStyle={{
                      color: palette.coolGray[50],
                    }}
                    headerButtonColor={palette.coolGray[50]}
                  />
                  <Button
                    text="Cancel"
                    variant={'secondary'}
                    onPress={() => setShowDatePicker(false)}
                  />
                </View>
              </ScreenView>
            </Modal>
            <TouchableOpacity
              onPress={() => {
                setAppointmentSearchStart((curr) => curr.add(-1, 'days'));
              }}
            >
              <Ionicons name="chevron-back" size={32} color={palette.cyan[600]} />
            </TouchableOpacity>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <Text className="px-4 text-2xl" weight="bold">
                {appointmentSearchStart.format('dddd MM/DD/YYYY')}
              </Text>
            </Pressable>
            <TouchableOpacity
              onPress={() => {
                setAppointmentSearchStart((curr) => curr.add(1, 'days'));
              }}
            >
              <Ionicons name="chevron-forward" size={32} color={palette.cyan[600]} />
            </TouchableOpacity>
          </View>
          {slotsLoading && <ActivityIndicator />}
          {slots?.total === 0 && (
            <Text italic className="text-center text-xl">
              No available appointments
            </Text>
          )}
          <FlatList
            showsVerticalScrollIndicator={false}
            className="pb-20"
            data={slots?.entry?.map(({ resource }) => resource) ?? []}
            keyExtractor={(slot) => `${slot.start}-${slot.end}`}
            renderItem={({ item: slot }) => (
              <View className="my-2">
                <SlotDetail slot={slot} patientId={patientId} practitionerId={practitionerId} />
              </View>
            )}
          />
        </View>
      </View>
    </ScreenView>
  ) : null;
};

export default Appointments;
