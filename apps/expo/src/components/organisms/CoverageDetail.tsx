import { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { getGroupId, getPayorName } from '@/fhirpath/coverage';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { getCoverageResource } from '@/utils/fhir';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { type Coverage } from '@careforge/canvas';

import { Text } from '../atoms/Text';
import { AddEditInsuranceModal } from '../molecules/AddEditInsuranceModal';
import { type InsuranceFormType } from '../organisms/InsuranceForm';

export const CoverageDetail = ({
  coverage,
  patientId,
}: {
  coverage: Coverage;
  patientId: string;
}) => {
  const groupId = getGroupId(coverage);
  const [insuranceModalOpen, setInsuranceModalOpen] = useState(false);

  const utils = api.useUtils();
  const updateCoverageMutation = api.coverage.update.useMutation({
    onSuccess: async () => {
      await utils.coverage.search.invalidate();
      setInsuranceModalOpen(false);
    },
  });

  const handleCoverageSave = useCallback(
    (form: InsuranceFormType) => {
      const updatedCoverage = getCoverageResource({
        ...form,
        patientId,
      });

      updateCoverageMutation.mutate({
        resource: updatedCoverage,
        id: coverage.id,
      });
    },
    [updateCoverageMutation, patientId, coverage],
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setInsuranceModalOpen(true);
        }}
      >
        <View className="border-coolGray-300 bg-coolGray-700 h-52 w-full rounded-md border p-4">
          <View className="flex flex-1 justify-between">
            <View>
              <View className="flex flex-row items-center gap-2">
                <Ionicons name="medkit" size={32} color={palette.purple[200]} />
                <Text className="text-2xl" weight="bold">
                  {getPayorName(coverage)}
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between">
                <View className="mt-6 flex flex-row gap-12">
                  <View>
                    <Text className="text-xl" italic>
                      Member ID:
                    </Text>
                    <Text className="text-lg">{coverage.subscriberId}</Text>
                  </View>
                  {groupId && (
                    <View>
                      <Text className="text-xl" italic>
                        Group ID:
                      </Text>
                      <Text className="text-lg">{getGroupId(coverage)}</Text>
                    </View>
                  )}
                </View>
                <View>
                  <Ionicons name="pencil" size={24} color={palette.cyan[700]} />
                </View>
              </View>
            </View>
            {coverage.period?.start ? (
              <Text className="text-lg">
                Active as of{' '}
                <Text weight="bold">{dayjs(coverage.period.start).format('MM/DD/YYYY')}</Text>
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      <AddEditInsuranceModal
        isOpen={insuranceModalOpen}
        existingInsurance={coverage}
        onClose={() => setInsuranceModalOpen(false)}
        onSubmit={handleCoverageSave}
        isMutating={updateCoverageMutation.isPending}
      />
    </>
  );
};
