import { View } from 'react-native';
import { getAllergen, getSeverityText } from '@/fhirpath/allergyintolerance';

import { type AllergyIntolerance } from '@canvas-challenge/canvas';

import { Text } from '../atoms/Text';

export const AllergyDetail = ({
  allergyIntolerance,
}: {
  allergyIntolerance: AllergyIntolerance;
}) => {
  const allergen = getAllergen(allergyIntolerance);
  const severity = getSeverityText(allergyIntolerance);

  return (
    <View>
      <Text className="text-xl">
        {allergen} ({severity})
      </Text>
    </View>
  );
};
