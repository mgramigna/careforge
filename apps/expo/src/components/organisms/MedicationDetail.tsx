import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { getMedicationDisplay } from '@/fhirpath/medicationstatement';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { type MedicationStatement } from '@careforge/canvas';

import { DetailCard } from '../molecules/DetailCard';
import { MedicationModal } from '../molecules/MedicationModal';

export const MedicationDetail = ({
  medicationStatement,
}: {
  medicationStatement: MedicationStatement;
}) => {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const medicationName = getMedicationDisplay(medicationStatement);

  const utils = api.useUtils();
  const updateMedicationStatement = api.medicationstatement.update.useMutation({
    onSuccess: async () => {
      await utils.medicationstatement.search.invalidate();
      setDetailModalOpen(false);
    },
    onError: () => {
      Alert.alert('Something went wrong');
    },
  });

  const handleStopMedication = useCallback(
    (id: string) => {
      updateMedicationStatement.mutate({
        id,
        resource: {
          ...medicationStatement,
          status: 'entered-in-error',
        },
      });
    },
    [updateMedicationStatement, medicationStatement],
  );

  return (
    <>
      <DetailCard
        text={medicationName}
        leftIcon={<MaterialCommunityIcons name="pill" size={18} color={palette.coolGray[500]} />}
        onPress={() => setDetailModalOpen(true)}
      />
      <MedicationModal
        medicationStatement={medicationStatement}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onStopMedication={handleStopMedication}
        isMutating={updateMedicationStatement.isPending}
      />
    </>
  );
};
