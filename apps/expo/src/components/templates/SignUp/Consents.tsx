import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { getFullName } from '@/fhirpath/patient';
import { api } from '@/utils/api';

export const Consents = ({
  onContinue,
  patientId,
  isMutating,
}: {
  onContinue: () => void;
  patientId: string;
  isMutating?: boolean;
}) => {
  const [agreed, setAgreed] = useState(false);

  const { data: patient } = api.patient.get.useQuery({
    id: patientId,
  });

  return (
    <ScreenView>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <Text className="pt-8 text-center text-5xl">🎉 Success 🎉</Text>
        <View className="mt-4">
          <Text>
            Thanks for taking control of your healthcare! Before we get started, please read and
            agree to the following consents:
          </Text>
        </View>
        <View className="mt-8">
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
            2. I allow <Text weight="bold">Careforge</Text> to file for insurance benefits to pay
            for the care I receive. I understand:
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
        <View className="mt-4">
          <Checkbox
            checked={agreed}
            onPress={() => setAgreed((curr) => !curr)}
            label="I agree to the above consents"
          />
        </View>
        <View className="mt-8 flex flex-row gap-8">
          <View className="flex-1">
            <Button
              disabled={!agreed}
              text="Continue"
              onPress={onContinue}
              isLoading={isMutating}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenView>
  );
};
