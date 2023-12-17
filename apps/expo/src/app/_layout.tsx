import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { TRPCProvider } from '@/utils/api';
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from '@expo-google-fonts/open-sans';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import '../styles.css';

import { AuthProvider } from '@/context/AuthContext';

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_300Light_Italic,
    OpenSans_700Bold_Italic,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <TRPCProvider>
        <RootSiblingParent>
          <Slot />
        </RootSiblingParent>
      </TRPCProvider>
    </AuthProvider>
  );
};

export default RootLayout;
