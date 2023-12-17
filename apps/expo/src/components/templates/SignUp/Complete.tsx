import { ScrollView } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';

export const Complete = ({ patientId }: { patientId: string }) => {
  return (
    <ScreenView>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <Text>COMPLETE {patientId}</Text>
      </ScrollView>
    </ScreenView>
  );
};
