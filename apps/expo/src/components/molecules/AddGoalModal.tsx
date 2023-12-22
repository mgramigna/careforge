import { Modal, ScrollView, View } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { ScreenView } from '../molecules/ScreenView';

export const AddGoalModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <AutocompleteDropdownContextProvider>
        <ScreenView>
          <ScrollView className="h-full">
            <Text className="mt-8 text-xl">
              To update your health goals, please reach out to your care team
            </Text>
            <View className="mt-8 flex flex-row gap-8">
              <View className="flex-1">
                <Button text="Close" variant="secondary" onPress={onClose} />
              </View>
            </View>
          </ScrollView>
        </ScreenView>
      </AutocompleteDropdownContextProvider>
    </Modal>
  );
};
