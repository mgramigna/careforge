import { useState } from 'react';
import { Modal, ScrollView, View } from 'react-native';
import { usePatient } from '@/context/PatientContext';
import { getConsentName } from '@/fhirpath/consent';
import { palette } from '@/theme/colors';
import { getConsentType } from '@/utils/consent';
import { Ionicons } from '@expo/vector-icons';

import { type Consent } from '@careforge/canvas';

import { Button } from '../atoms/Button';
import { ConsentText } from '../molecules/ConsentText';
import { DetailCard } from '../molecules/DetailCard';
import { ScreenView } from '../molecules/ScreenView';

export const ConsentDetail = ({ consent }: { consent: Consent }) => {
  const { patient } = usePatient();
  const consentType = getConsentType(consent);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DetailCard
        text={`${getConsentName(consent)} (${
          consent.status === 'active' ? 'Accepted' : 'Rejected'
        })`}
        leftIcon={<Ionicons name="document" size={24} color={palette.cyan[700]} />}
        onPress={() => setIsOpen(true)}
      />
      <Modal
        animationType="slide"
        visible={isOpen}
        presentationStyle="pageSheet"
        onRequestClose={() => setIsOpen(false)}
      >
        <ScreenView>
          <ScrollView className="h-full">
            <ConsentText consentType={consentType} patient={patient} />
            <View className="mt-8">
              <Button variant="secondary" onPress={() => setIsOpen(false)} text="Close" />
            </View>
          </ScrollView>
        </ScreenView>
      </Modal>
    </>
  );
};
