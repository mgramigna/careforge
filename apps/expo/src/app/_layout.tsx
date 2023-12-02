import React from 'react';
import { Slot } from 'expo-router';
import { TRPCProvider } from '@/utils/api';

import '../styles.css';

import { AuthProvider } from '@/context/AuthContext';

const RootLayout = () => {
  return (
    <AuthProvider>
      <TRPCProvider>
        <Slot />
      </TRPCProvider>
    </AuthProvider>
  );
};

export default RootLayout;
