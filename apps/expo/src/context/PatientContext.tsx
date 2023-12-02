import { createContext, useContext, type PropsWithChildren } from 'react';
import { api } from '@/utils/api';

import { type Patient } from '@canvas-challenge/canvas';

interface PatientContextType {
  patient?: Patient | null;
  isLoading: boolean;
}

const PatientContext = createContext<PatientContextType>({ patient: null, isLoading: false });

export function usePatient() {
  const value = useContext(PatientContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in an <AuthProvider />');
    }
  }

  return value;
}

interface PatientProviderProps extends PropsWithChildren {
  patientId: string;
}

export function PatientProvider({ patientId, children }: PatientProviderProps) {
  const { data: patient, isLoading } = api.patient.get.useQuery({
    id: patientId,
  });

  return (
    <PatientContext.Provider
      value={{
        patient,
        isLoading,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}
