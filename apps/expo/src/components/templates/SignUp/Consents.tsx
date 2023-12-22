import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Text } from '@/components/atoms/Text';
import { ConsentText } from '@/components/molecules/ConsentText';
import { ScreenView } from '@/components/molecules/ScreenView';
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
          <ConsentText consentType="release-of-information" patient={patient} />
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
