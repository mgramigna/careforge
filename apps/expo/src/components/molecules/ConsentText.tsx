import { View } from 'react-native';
import { getFullName } from '@/fhirpath/patient';
import { type ConsentType } from '@/utils/consent';
import { match } from 'ts-pattern';

import { type Patient } from '@careforge/canvas';

import { Skeleton } from '../atoms/Skeleton';
import { Text } from '../atoms/Text';

const ReleaseOfInfo = ({ patient }: { patient?: Patient | null }) => {
  return (
    <>
      <View>
        <Text>
          1. I,{' '}
          {patient ? (
            <Text weight="bold">{getFullName(patient)}</Text>
          ) : (
            <Skeleton className="bg-coolGray-300 h-4 w-10" />
          )}{' '}
          give permission for <Text weight="bold">Careforge</Text> to give me medical treatment.
        </Text>
      </View>
      <View className="mt-4">
        <Text>
          2. I allow <Text weight="bold">Careforge</Text> to file for insurance benefits to pay for
          the care I receive. I understand:
        </Text>
        <View className="mt-2 flex gap-2 pl-8">
          <Text>
            {'\u2022'} <Text weight="bold">Careforge</Text> will have to send my medical record
            information to my insurance company.
          </Text>

          <Text>{'\u2022'} I must pay my share of the costs.</Text>
          <Text>
            {'\u2022'} I must pay for the cost of these services if my insurance does not pay or I
            do not have insurance.
          </Text>
        </View>
      </View>
      <View className="mt-4">
        <Text>3. I understand:</Text>
        <View className="mt-2 flex gap-2 pl-8">
          <Text>{'\u2022'} I have the right to refuse any procedure or treatment.</Text>

          <Text>
            {'\u2022'} I have the right to discuss all medical treatments with my clinician.
          </Text>
          <Text>
            {'\u2022'} I must pay for the cost of these services if my insurance does not pay or I
            do not have insurance.
          </Text>
        </View>
      </View>
    </>
  );
};

export const ConsentText = ({
  consentType,
  patient,
}: {
  consentType: ConsentType;
  patient?: Patient | null;
}) => {
  return match(consentType)
    .with('release-of-information', () => <ReleaseOfInfo patient={patient} />)
    .otherwise(() => null);
};
