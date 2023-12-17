import { type Gender } from '@/components/templates/SignUp/types';
import dayjs from 'dayjs';
import { match } from 'ts-pattern';

import {
  type Appointment,
  type CareTeam,
  type Communication,
  type Patient,
} from '@careforge/canvas';

import {
  HARDCODED_OFFICE_LOCATION_ID_FOR_CREATE,
  MG_PRACTITIONER_ID,
  OFFICE_VISIT_CODE,
  TELEHEALTH_VISIT_CODE,
} from './constants';

export function getIdPartFromReference(reference: string): string {
  const [_resourceType, idPart] = reference.split('/');

  return idPart!;
}

export function getCommunicationResource({
  senderId,
  recipientId,
  senderType,
  recipientType,
  message,
}: {
  message: string;
  senderId: string;
  recipientId: string;
  senderType: 'Patient' | 'Practitioner';
  recipientType: 'Patient' | 'Practitioner';
}): Omit<Communication, 'id'> {
  return {
    resourceType: 'Communication' as const,
    status: 'unknown',
    sent: new Date().toISOString(),
    recipient: [
      {
        type: recipientType,
        reference: `${recipientType}/${recipientId}`,
      },
    ],
    sender: {
      type: senderType,
      reference: `${senderType}/${senderId}`,
    },
    payload: [
      {
        contentString: message,
      },
    ],
  };
}

export function getAppointmentResource({
  start,
  end,
  patientId,
  practitionerId,
  appointmentType,
  reasonText,
}: {
  start: string;
  end: string;
  patientId: string;
  practitionerId: string;
  appointmentType: 'office' | 'telehealth';
  reasonText?: string;
}): Omit<Appointment, 'id'> {
  return {
    resourceType: 'Appointment' as const,
    status: 'proposed',
    start,
    end,
    appointmentType: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: appointmentType === 'office' ? OFFICE_VISIT_CODE : TELEHEALTH_VISIT_CODE,
          display:
            appointmentType === 'office'
              ? 'Office Visit'
              : 'Telemedicine consultation with patient (procedure)',
        },
      ],
    },
    supportingInformation: [
      {
        reference: `Location/${HARDCODED_OFFICE_LOCATION_ID_FOR_CREATE}`,
        type: 'Location',
      },
    ],
    ...(reasonText && {
      reasonCode: [
        {
          text: reasonText,
        },
      ],
    }),
    participant: [
      {
        status: 'accepted',
        actor: {
          reference: `Practitioner/${practitionerId}`,
          type: 'Practitioner',
        },
      },
      {
        status: 'accepted',
        actor: {
          reference: `Patient/${patientId}`,
          type: 'Patient',
        },
      },
    ],
  };
}

export function getPatientResource({
  firstName,
  lastName,
  gender,
  dateOfBirth,
  email,
}: {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  email: string;
}): Omit<Patient, 'id' | 'identifier'> {
  return {
    resourceType: 'Patient' as const,
    gender,
    birthDate: dayjs(dateOfBirth).format('YYYY-MM-DD'),
    name: [
      {
        use: 'official',
        family: lastName,
        given: [firstName],
      },
    ],
    extension: [
      {
        url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex',
        valueCode: match(gender)
          .with('male', () => 'M')
          .with('female', () => 'F')
          .otherwise(() => 'UNK'),
      },
    ],
    telecom: [
      {
        system: 'email',
        value: email,
        use: 'home',
      },
    ],
  };
}

export function getCareTeamResource({ patientId }: { patientId: string }): Omit<CareTeam, 'id'> {
  return {
    resourceType: 'CareTeam' as const,
    status: 'active',
    subject: {
      reference: `Patient/${patientId}`,
      type: 'Patient',
    },
    participant: [
      {
        role: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '446050000',
                display: 'Primary care physician',
              },
            ],
          },
        ],
        member: {
          reference: `Practitioner/${MG_PRACTITIONER_ID}`,
          type: 'Practitioner',
          display: 'Matthew Gramigna MD',
        },
      },
    ],
  };
}
