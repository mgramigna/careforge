import {
  AllergenService,
  AllergyIntoleranceService,
  AppointmentService,
  CarePlanService,
  CareTeamService,
  ClaimService,
  CommunicationService,
  ConditionService,
  ConsentService,
  CoverageEligibilityRequestService,
  CoverageEligibilityResponseService,
  CoverageService,
  DeviceService,
  DiagnosticReportService,
  DocumentReferenceService,
  EncounterService,
  GoalService,
  GroupService,
  ImmunizationService,
  LocationService,
  MediaService,
  MedicationRequestService,
  MedicationService,
  MedicationStatementService,
  ObservationService,
  OrganizationService,
  PatientService,
  PaymentNoticeService,
  PractitionerService,
  ProcedureService,
  ProvenanceService,
  QuestionnaireResponseService,
  QuestionnaireService,
  ScheduleService,
  SlotService,
  TaskService,
} from '@canvas-challenge/canvas';

import { createAllergenRouter } from './router/allergen';
import { createAllergyIntoleranceRouter } from './router/allergyintolerance';
import { createAppointmentRouter } from './router/appointment';
import { createCarePlanRouter } from './router/careplan';
import { createCareTeamRouter } from './router/careteam';
import { createClaimRouter } from './router/claim';
import { createCommunicationRouter } from './router/communication';
import { createConditionRouter } from './router/condition';
import { createConsentRouter } from './router/consent';
import { createCoverageRouter } from './router/coverage';
import { createCoverageEligibilityRequestRouter } from './router/coverageeligibilityrequest';
import { createCoverageEligibilityResponseRouter } from './router/coverageeligibilityresponse';
import { createDeviceRouter } from './router/device';
import { createDiagnosticReportRouter } from './router/diagnosticreport';
import { createDocumentReferenceRouter } from './router/documentreference';
import { createEncounterRouter } from './router/encounter';
import { createGoalRouter } from './router/goal';
import { createGroupRouter } from './router/group';
import { createImmunizationRouter } from './router/immunization';
import { createLocationRouter } from './router/location';
import { createMediaRouter } from './router/media';
import { createMedicationRouter } from './router/medication';
import { createMedicationRequestRouter } from './router/medicationrequest';
import { createMedicationStatementRouter } from './router/medicationstatement';
import { createObservationRouter } from './router/observation';
import { createOrganizationRouter } from './router/organization';
import { createPatientRouter } from './router/patient';
import { createPaymentNoticeRouter } from './router/paymentnotice';
import { createPractitionerRouter } from './router/practitioner';
import { createProcedureRouter } from './router/procedure';
import { createProvenanceRouter } from './router/provenance';
import { createQuestionnaireRouter } from './router/questionnaire';
import { createQuestionnaireResponseRouter } from './router/questionnaireresponse';
import { createScheduleRouter } from './router/schedule';
import { createSlotRouter } from './router/slot';
import { createTaskRouter } from './router/task';
import { createTRPCRouter } from './trpc';

const allergenService = AllergenService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const allergyIntoleranceService = AllergyIntoleranceService({
  baseUrl: process.env.CANVAS_FHIR_BASE_URL!,
});
const appointmentService = AppointmentService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const carePlanService = CarePlanService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const careTeamService = CareTeamService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const claimService = ClaimService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const communicationService = CommunicationService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const conditionService = ConditionService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const consentService = ConsentService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const coverageService = CoverageService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const coverageEligibilityRequestService = CoverageEligibilityRequestService({
  baseUrl: process.env.CANVAS_FHIR_BASE_URL!,
});
const coverageEligibilityResponseService = CoverageEligibilityResponseService({
  baseUrl: process.env.CANVAS_FHIR_BASE_URL!,
});
const deviceService = DeviceService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const diagnosticReportService = DiagnosticReportService({
  baseUrl: process.env.CANVAS_FHIR_BASE_URL!,
});
const documentReferenceService = DocumentReferenceService({
  baseUrl: process.env.CANVAS_FHIR_BASE_URL!,
});
const encounterService = EncounterService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const goalService = GoalService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const groupService = GroupService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const immunizationService = ImmunizationService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const locationService = LocationService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const mediaService = MediaService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const medicationService = MedicationService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const medicationRequestService = MedicationRequestService({
  baseUrl: process.env.CANVAS_FHIR_BASE_URL!,
});
const medicationStatementService = MedicationStatementService({
  baseUrl: process.env.CANVAS_FHIR_BASE_URL!,
});
const observationService = ObservationService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const organizationService = OrganizationService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const patientService = PatientService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const paymentNoticeService = PaymentNoticeService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const practitionerService = PractitionerService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const procedureService = ProcedureService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const provenanceService = ProvenanceService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const questionnaireService = QuestionnaireService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const questionnaireResponseService = QuestionnaireResponseService({
  baseUrl: process.env.CANVAS_FHIR_BASE_URL!,
});
const scheduleService = ScheduleService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const slotService = SlotService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });
const taskService = TaskService({ baseUrl: process.env.CANVAS_FHIR_BASE_URL! });

export const appRouter = createTRPCRouter({
  allergen: createAllergenRouter({ allergenService }),
  allergyintolerance: createAllergyIntoleranceRouter({ allergyIntoleranceService }),
  appointment: createAppointmentRouter({ appointmentService }),
  careplan: createCarePlanRouter({ carePlanService }),
  careteam: createCareTeamRouter({ careTeamService }),
  claim: createClaimRouter({ claimService }),
  communication: createCommunicationRouter({ communicationService }),
  condition: createConditionRouter({ conditionService }),
  consent: createConsentRouter({ consentService }),
  coverage: createCoverageRouter({ coverageService }),
  coverageeligibilityrequest: createCoverageEligibilityRequestRouter({
    coverageEligibilityRequestService,
  }),
  coverageeligibilityresponse: createCoverageEligibilityResponseRouter({
    coverageEligibilityResponseService,
  }),
  device: createDeviceRouter({ deviceService }),
  diagnosticreport: createDiagnosticReportRouter({ diagnosticReportService }),
  documentreference: createDocumentReferenceRouter({ documentReferenceService }),
  encounter: createEncounterRouter({ encounterService }),
  goal: createGoalRouter({ goalService }),
  group: createGroupRouter({ groupService }),
  immunization: createImmunizationRouter({ immunizationService }),
  location: createLocationRouter({ locationService }),
  media: createMediaRouter({ mediaService }),
  medication: createMedicationRouter({ medicationService }),
  medicationrequest: createMedicationRequestRouter({ medicationRequestService }),
  medicationstatement: createMedicationStatementRouter({ medicationStatementService }),
  observation: createObservationRouter({ observationService }),
  organization: createOrganizationRouter({ organizationService }),
  patient: createPatientRouter({ patientService }),
  paymentnotice: createPaymentNoticeRouter({ paymentNoticeService }),
  practitioner: createPractitionerRouter({ practitionerService }),
  procedure: createProcedureRouter({ procedureService }),
  provenance: createProvenanceRouter({ provenanceService }),
  questionnaire: createQuestionnaireRouter({ questionnaireService }),
  questionnaireresponse: createQuestionnaireResponseRouter({ questionnaireResponseService }),
  schedule: createScheduleRouter({ scheduleService }),
  slot: createSlotRouter({ slotService }),
  task: createTaskRouter({ taskService }),
});

export type AppRouter = typeof appRouter;
