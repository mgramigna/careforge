import { getMedicationDisplay } from '@/fhirpath/medicationstatement';
import { palette } from '@/theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { type MedicationStatement } from '@careforge/canvas';

import { DetailCard } from '../molecules/DetailCard';

export const MedicationDetail = ({
  medicationStatement,
}: {
  medicationStatement: MedicationStatement;
}) => {
  const medicationName = getMedicationDisplay(medicationStatement);

  return (
    <DetailCard
      text={medicationName}
      leftIcon={<MaterialCommunityIcons name="pill" size={18} color={palette.coolGray[500]} />}
    />
  );
};
