import { getAllergen, getSeverityText } from '@/fhirpath/allergyintolerance';
import { palette } from '@/theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { type AllergyIntolerance } from '@careforge/canvas';

import { DetailCard } from '../molecules/DetailCard';

export const AllergyDetail = ({
  allergyIntolerance,
}: {
  allergyIntolerance: AllergyIntolerance;
}) => {
  const allergen = getAllergen(allergyIntolerance);
  const severity = getSeverityText(allergyIntolerance);

  return (
    <DetailCard
      text={`${allergen} (${severity})`}
      leftIcon={<MaterialCommunityIcons name="allergy" size={18} color={palette.coolGray[500]} />}
    />
  );
};
