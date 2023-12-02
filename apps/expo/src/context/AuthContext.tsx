/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from 'react';
import { useStorageState } from '@/hooks/useStorageState';

const KEY = 'patient-id';

const AuthContext = React.createContext<{
  signIn: (patientId: string) => void;
  signOut: () => void;
  patientId?: string | null;
  isLoading: boolean;
}>({
  signIn: () => {},
  signOut: () => {},
  patientId: null,
  isLoading: false,
});

export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in an <AuthProvider />');
    }
  }

  return value;
}

export function AuthProvider(props: React.PropsWithChildren) {
  const [[isLoading, patientId], setPatientId] = useStorageState(KEY);

  return (
    <AuthContext.Provider
      value={{
        signIn: (patientId) => {
          setPatientId(patientId);
        },
        signOut: () => {
          setPatientId(null);
        },
        patientId,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
