import path from 'path';
import dotenv from 'dotenv';

import { PatientService } from '@canvas-challenge/canvas';

import { createPatientRouter } from './router/patient';
import { createTRPCRouter } from './trpc';

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
});

const patientService = PatientService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });

export const appRouter = createTRPCRouter({
  patient: createPatientRouter({ patientService }),
});

export type AppRouter = typeof appRouter;
