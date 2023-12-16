import { Linking, Modal, Platform, Pressable, View } from 'react-native';

import { type Address, type Appointment, type Location } from '@careforge/canvas';

import { Text } from '../atoms/Text';
import { ScreenView } from './ScreenView';

function getAddressUrlQuery(address: Address) {
  return `${address.line[0]}+${address.city}+${address.state}+${address.postalCode}`.replace(
    / /g,
    '+',
  );
}

export const AppointmentDetailModal = ({
  appointment: _appointment,
  location,
  isOpen,
  onClose,
}: {
  appointment: Appointment;
  location?: Location | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ScreenView>
        <View className="bg-coolGray-50 h-full">
          <Text className="text-center text-3xl">Your Appointment</Text>
          {location?.address && (
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
              <Text>{location?.name}</Text>
              <Text>{location?.address?.line[0]}</Text>
              <Text>
                {location?.address?.city}, {location?.address?.state}{' '}
                {location?.address?.postalCode}
              </Text>
            </Pressable>
          )}
        </View>
      </ScreenView>
    </Modal>
  );
};
