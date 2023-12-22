import { Modal, ScrollView, View } from 'react-native';
import { getDosageText, getMedicationDisplay } from '@/fhirpath/medicationstatement';

import { type MedicationStatement } from '@careforge/canvas';

import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { ScreenView } from './ScreenView';

export const MedicationModal = ({
  medicationStatement,
  isOpen,
  onClose,
  onStopMedication,
  isMutating,
}: {
  medicationStatement: MedicationStatement;
  isOpen: boolean;
  onClose: () => void;
  onStopMedication: (medicationStatementId: string) => void;
  isMutating?: boolean;
}) => {
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
              Medication
            </Text>
            <Text className="text-xl">{getMedicationDisplay(medicationStatement)}</Text>
          </View>
          <View className="mt-12">
            <Text weight="bold" className="mb-4 text-3xl">
              Dosage
            </Text>
            <Text className="text-xl">{getDosageText(medicationStatement)}</Text>
          </View>
          <View className="mt-8 flex flex-row gap-8">
            <View className="flex-1">
              <Button text="Close" variant="secondary" onPress={onClose} />
            </View>
            <View className="flex-1">
              <Button
                text="No Longer Taking"
                onPress={() => onStopMedication(medicationStatement.id)}
                isLoading={isMutating}
              />
            </View>
          </View>
        </ScrollView>
      </ScreenView>
    </Modal>
  );
};
