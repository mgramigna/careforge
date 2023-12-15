import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';
import { getConsentName } from '@/fhirpath/consent';
import { api } from '@/utils/api';

const Documents = () => {
  const { patientId } = useAuth();

  const { data: consentBundle } = api.consent.search.useQuery(
    {
      patient: patientId!,
    },
    {
      enabled: !!patientId,
    },
  );

  return patientId ? (
    <ScreenView>
      <View className="h-full">
        <Text className="text-2xl" weight="bold">
          Docs
        </Text>
        {consentBundle?.entry?.map(({ resource }) => (
          <Text key={resource.id}>{getConsentName(resource)}</Text>
        ))}
      </View>
    </ScreenView>
  ) : null;
};

export default Documents;
