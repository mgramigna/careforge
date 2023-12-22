import { Fragment } from 'react';
import { View } from 'react-native';
import {
  getEthnicityDisplays,
  getGenderIdentityDisplay,
  getRaceDisplays,
} from '@/fhirpath/patient';

import { type Patient } from '@careforge/canvas';

import { Chip } from '../atoms/Chip';
import { InputLabel } from '../molecules/InputLabel';

export const DemographicsInfo = ({ patient }: { patient: Patient }) => {
  const races = getRaceDisplays(patient);
  const ethnicities = getEthnicityDisplays(patient);
  const genderIdentity = getGenderIdentityDisplay(patient);

  return (
    <>
      <View className="flex gap-8">
        {genderIdentity && (
          <View>
            <InputLabel label="Gender Identity" />
            <View className="flex flex-row">
              <Chip text={genderIdentity} />
            </View>
          </View>
        )}
        {races.length > 0 && (
          <View>
            <InputLabel label="Race" />
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
            <InputLabel label="Ethnicity" />
            <View className="flex flex-row flex-wrap gap-2">
              {ethnicities.map((ethnicity) => (
                <Fragment key={ethnicity}>
                  <Chip text={ethnicity} />
                </Fragment>
              ))}
            </View>
          </View>
        )}
      </View>
    </>
  );
};
