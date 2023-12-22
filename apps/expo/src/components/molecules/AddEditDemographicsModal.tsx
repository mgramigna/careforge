import { Modal } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

import { type Patient } from '@careforge/canvas';

import { ScreenView } from '../molecules/ScreenView';
import { DemographicsForm, type DemographicsFormType } from '../organisms/DemographicsForm';

export const AddEditDemographicsModal = ({
  isOpen,
  onSubmit,
  onClose,
  patient,
  isMutating,
}: {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: DemographicsFormType) => void;
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
          <DemographicsForm
            onCancel={onClose}
            onSubmit={onSubmit}
            isMutating={isMutating}
            patient={patient}
          />
        </ScreenView>
      </AutocompleteDropdownContextProvider>
    </Modal>
  );
};
