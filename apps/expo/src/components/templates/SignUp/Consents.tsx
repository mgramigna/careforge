import { ScrollView, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { ScreenView } from '@/components/molecules/ScreenView';
import { isValid } from 'zod';

export const Consents = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <ScreenView>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <Text>consents</Text>
        <View className="mt-8 flex flex-row gap-8">
          <View className="flex-1">
            <Link href=".." asChild>
              <Button text="Back" variant="secondary" />
            </Link>
          </View>
          <View className="flex-1">
            <Button disabled={!isValid} text="Continue" onPress={onContinue} />
          </View>
        </View>
      </ScrollView>
    </ScreenView>
  );
};
