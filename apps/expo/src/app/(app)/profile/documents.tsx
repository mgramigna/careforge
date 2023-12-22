import React, { Fragment } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { ConsentDetail } from '@/components/organisms/ConsentDetail';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';

const Documents = () => {
  const { patientId } = useAuth();

  const { data: consentBundle, isLoading: consentsLoading } = api.consent.search.useQuery(
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
          Documents
        </Text>
        <View className="mt-12">
          {consentsLoading && <ActivityIndicator />}
          {!consentsLoading &&
            consentBundle?.entry?.map(({ resource }) => (
              <Fragment key={resource.id}>
                <ConsentDetail consent={resource} />
              </Fragment>
            ))}
        </View>
      </View>
    </ScreenView>
  ) : null;
};

export default Documents;
