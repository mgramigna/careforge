import { Modal, View } from 'react-native';

import { type Slot } from '@canvas-challenge/canvas';

import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { ScreenView } from './ScreenView';

export const ScheduleAppointmentModal = ({
  slot,
  isOpen,
  onClose,
  onConfirm,
}: {
  slot: Slot;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ScreenView>
        <View className="h-full">
          <Text>TODO: schedule appt</Text>
          <Text>
            {slot.start} - {slot.end}
          </Text>
          <Button text="Confirm Appointment" onPress={onConfirm} />
          <Button variant={'secondary'} text="Cancel" onPress={onClose} />
        </View>
      </ScreenView>
    </Modal>
  );
};
