import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { router } from 'expo-router';
import { ScreenView } from '@/components/molecules/ScreenView';
import { MedicationForm, type MedicationFormType } from '@/components/organisms/MedicationForm';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';
import { getMedicationStatement } from '@/utils/fhir';

const Medication = () => {
  const { patientId } = useAuth();

  const utils = api.useUtils();
  const createMedicationStatement = api.medicationstatement.create.useMutation({
    onSuccess: async () => {
      await utils.medicationstatement.search.invalidate();
      router.push('..');
    },
    onError: () => {
      Alert.alert('Something went wrong');
    },
  });

  const handleSubmit = useCallback(
    (form: MedicationFormType) => {
      const medicationStatement = getMedicationStatement({
        patientId: patientId!,
        dosageText: `${form.dosageText} ${form.timingText}`,
        medicationId: form.medicationResourceId,
      });

      createMedicationStatement.mutate(medicationStatement);
    },
    [patientId, createMedicationStatement],
  );

  return patientId ? (
    <AutocompleteDropdownContextProvider>
      <ScreenView>
        <MedicationForm
          onSubmit={handleSubmit}
          onCancel={() => router.push('..')}
          isMutating={createMedicationStatement.isPending}
        />
      </ScreenView>
    </AutocompleteDropdownContextProvider>
  ) : null;
};

export default Medication;
