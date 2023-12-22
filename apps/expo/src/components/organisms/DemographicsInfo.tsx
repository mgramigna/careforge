import { Fragment } from 'react';
import { View } from 'react-native';
import {
  getEthnicityDisplays,
  getGenderIdentityDisplay,
  getRaceDisplays,
} from '@/fhirpath/patient';

import { type Patient } from '@careforge/canvas';

import { Chip } from '../atoms/Chip';
import { Text } from '../atoms/Text';

export const DemographicsInfo = ({ patient }: { patient: Patient }) => {
  const races = getRaceDisplays(patient);
  const ethnicities = getEthnicityDisplays(patient);
  const genderIdentity = getGenderIdentityDisplay(patient);

  return (
    <>
      <View className="flex gap-8">
        {races.length > 0 && (
          <View>
            <Text className="mb-2 pl-1 text-2xl">Race</Text>
            <View className="flex flex-row flex-wrap gap-2">
              {races.map((race) => (
                <Fragment key={race}>
                  <Chip text={race} />
                </Fragment>
              ))}
            </View>
          </View>
        )}
        {ethnicities.length > 0 && (
          <View>
            <Text className="mb-2 pl-1 text-2xl">Ethnicity</Text>
            <View className="flex flex-row flex-wrap gap-2">
              {ethnicities.map((ethnicity) => (
                <Fragment key={ethnicity}>
                  <Chip text={ethnicity} />
                </Fragment>
              ))}
            </View>
          </View>
        )}
        {genderIdentity && (
          <View>
            <Text className="mb-2 pl-1 text-2xl">Gender Identity</Text>
            <View className="flex flex-row">
              <Chip text={genderIdentity} />
            </View>
          </View>
        )}
      </View>
    </>
  );
};
