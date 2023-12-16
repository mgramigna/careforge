import { View } from 'react-native';
import { getMedicationDisplay } from '@/fhirpath/medicationstatement';

import { type MedicationStatement } from '@careforge/canvas';

import { Text } from '../atoms/Text';

export const MedicationDetail = ({
  medicationStatement,
}: {
  medicationStatement: MedicationStatement;
}) => {
  const medicationName = getMedicationDisplay(medicationStatement);

  return (
    <View>
      <Text className="text-xl">{medicationName}</Text>
    </View>
  );
};
