import { useCallback } from 'react';
import { Linking, Modal, Platform, Pressable, ScrollView, View } from 'react-native';
import { usePatient } from '@/context/PatientContext';
import { getAppointmentType, getReason } from '@/fhirpath/appointment';
import { getLocationAddress } from '@/fhirpath/location';
import { getPhone } from '@/fhirpath/patient';
import { match } from 'ts-pattern';

import { type Address, type Appointment, type Location } from '@careforge/canvas';

import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { ScreenView } from './ScreenView';

function getAddressUrlQuery(address: Address) {
  return `${address.line[0]}+${address.city}+${address.state}+${address.postalCode}`.replace(
    / /g,
    '+',
  );
}

export const AppointmentDetailModal = ({
  appointment,
  location,
  isOpen,
  onClose,
  practitionerName,
}: {
  appointment: Appointment;
  location?: Location | null;
  isOpen: boolean;
  onClose: () => void;
  practitionerName: string;
}) => {
  const { patient } = usePatient();

  const appointmentType = getAppointmentType(appointment);

  const renderLocationLink = useCallback((location: Location) => {
    return (
      <Pressable
        onPress={() => {
          const url = Platform.select({
            ios: `maps:0,0?q=${getAddressUrlQuery(location.address!)}`,
            android: `geo:0,0?q=${getAddressUrlQuery(location.address!)}`,
          });
          if (url) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            Linking.openURL(url);
          }
        }}
      >
        <Text className="text-xl text-pink-300 underline">{location.name}</Text>
        <Text className="text-xl text-pink-300 underline">{getLocationAddress(location)}</Text>
      </Pressable>
    );
  }, []);

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
              Appointment
            </Text>
            <Text className="text-xl">
              {match(appointmentType)
                .with('office', () => 'Office Visit')
                .with('telehealth', () => 'Telehealth Visit')
                .otherwise(() => 'Visit')}{' '}
              with <Text weight="bold">{practitionerName}</Text>
            </Text>
          </View>
          <View className="mt-12">
            <Text weight="bold" className="mb-4 text-3xl">
              Location
            </Text>
            {appointmentType === 'office' && location?.address && renderLocationLink(location)}
            {appointmentType === 'telehealth' && patient && (
              <Text className="text-xl">
                Your care team will call you at{' '}
                <Text className="text-pink-300 underline">{getPhone(patient)}</Text>
              </Text>
            )}
          </View>
          <View className="mt-12">
            <Text weight="bold" className="mb-4 text-3xl">
              Details
            </Text>
            <Text className="text-xl">{getReason(appointment)}</Text>
          </View>
          <View className="mt-24">
            <Button text="Close" onPress={onClose} variant="secondary" />
          </View>
        </ScrollView>
      </ScreenView>
    </Modal>
  );
};
