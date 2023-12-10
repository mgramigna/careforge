import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

export const PatientAvatar = ({ photoUrl }: { photoUrl: string }) => {
  return (
    <View className="h-20 w-20 overflow-hidden rounded-full">
      <Image style={styles.image} source={photoUrl} contentFit="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});
