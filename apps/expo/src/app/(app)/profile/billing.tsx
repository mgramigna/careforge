import React, { Fragment, useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { AddEditInsuranceModal } from '@/components/molecules/AddEditInsuranceModal';
import { ScreenView } from '@/components/molecules/ScreenView';
import { CoverageDetail } from '@/components/organisms/CoverageDetail';
import { type InsuranceFormType } from '@/components/organisms/InsuranceForm';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';
import { getCoverageResource } from '@/utils/fhir';

import { type Coverage } from '@careforge/canvas';

const Billing = () => {
  const { patientId } = useAuth();
  const [insuranceModalOpen, setInsuranceModalOpen] = useState(false);

  const { data: coverageBundle } = api.coverage.search.useQuery(
    {
      patient: patientId!,
    },
    {
      enabled: !!patientId,
    },
  );

  const utils = api.useUtils();
  const createCoverageMutation = api.coverage.create.useMutation({
    onSuccess: async () => {
      await utils.coverage.search.invalidate();
      setInsuranceModalOpen(false);
    },
  });

  const handleCoverageSave = useCallback(
    (form: InsuranceFormType) => {
      const coverage = getCoverageResource({
        ...form,
        patientId: patientId!,
      }) as Omit<Coverage, 'id'>;

      createCoverageMutation.mutate(coverage);
    },
    [createCoverageMutation, patientId],
  );

  return patientId ? (
    <>
      <ScreenView>
        <ScrollView className="h-full">
          <View>
            <Text className="text-3xl" weight="bold">
              My Bills
            </Text>
          </View>
          <View className="mt-8">
            <Text className="text-center text-xl" italic>
              No current bills
            </Text>
          </View>
          <View className="mt-8">
            <Text className="text-3xl" weight="bold">
              My Insurance
            </Text>
          </View>
          <View className="mt-8 flex gap-4">
            {coverageBundle?.entry
              ?.filter(({ resource }) => resource.status === 'active')
              .map(({ resource }) => (
                <Fragment key={resource.id}>
                  <CoverageDetail coverage={resource} patientId={patientId} />
                </Fragment>
              ))}
          </View>
          <View className="mt-8">
            <Button text="Add New Insurance" onPress={() => setInsuranceModalOpen(true)} />
          </View>
        </ScrollView>
      </ScreenView>
      <AddEditInsuranceModal
        isOpen={insuranceModalOpen}
        onClose={() => setInsuranceModalOpen(false)}
        onSubmit={handleCoverageSave}
      />
    </>
  ) : null;
};

export default Billing;
