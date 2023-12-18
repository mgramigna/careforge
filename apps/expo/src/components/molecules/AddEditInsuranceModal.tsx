import { Modal } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

import { type Coverage } from '@careforge/canvas';

import { ScreenView } from '../molecules/ScreenView';
import { InsuranceForm, type InsuranceFormType } from '../organisms/InsuranceForm';

export const AddEditInsuranceModal = ({
  isOpen,
  onSubmit,
  onClose,
  existingInsurance,
  isMutating,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: InsuranceFormType) => void;
  existingInsurance?: Coverage;
  isMutating?: boolean;
}) => {
  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <AutocompleteDropdownContextProvider>
        <ScreenView>
          <InsuranceForm
            onCancel={onClose}
            onSubmit={onSubmit}
            existingInsurance={existingInsurance}
            isMutating={isMutating}
          />
        </ScreenView>
      </AutocompleteDropdownContextProvider>
    </Modal>
  );
};
