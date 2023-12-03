import React from 'react';
import { Slot } from 'expo-router';
import { TRPCProvider } from '@/utils/api';
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/open-sans';

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
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <TRPCProvider>
        <Slot />
      </TRPCProvider>
    </AuthProvider>
  );
};

export default RootLayout;
