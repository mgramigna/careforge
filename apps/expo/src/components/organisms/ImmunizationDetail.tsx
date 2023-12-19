import { getVaccineName } from '@/fhirpath/immunization';
import { palette } from '@/theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { type Immunization } from '@careforge/canvas';

import { DetailCard } from '../molecules/DetailCard';

export const ImmunizationDetail = ({ immunization }: { immunization: Immunization }) => {
  const vaccineName = getVaccineName(immunization);

  return (
    <DetailCard
      text={vaccineName}
      leftIcon={<MaterialCommunityIcons name="needle" size={18} color={palette.coolGray[500]} />}
    />
  );
};
