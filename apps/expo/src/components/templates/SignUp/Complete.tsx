import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';

export const Complete = ({ patientId }: { patientId: string }) => {
  const { signIn } = useAuth();

  return (
    <ScreenView>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <Text>COMPLETE</Text>
        <Button
          text="Sign In"
          onPress={() => {
            signIn(patientId);
            router.replace('/home/');
          }}
        />
      </ScrollView>
    </ScreenView>
  );
};
