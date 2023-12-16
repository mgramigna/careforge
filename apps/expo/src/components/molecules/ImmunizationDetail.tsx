import { View } from 'react-native';
import { getVaccineName } from '@/fhirpath/immunization';

import { type Immunization } from '@canvas-challenge/canvas';

import { Text } from '../atoms/Text';

export const ImmunizationDetail = ({ immunization }: { immunization: Immunization }) => {
  const vaccineName = getVaccineName(immunization);

  return (
    <View>
      <Text className="text-xl">{vaccineName}</Text>
    </View>
  );
};
