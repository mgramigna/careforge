import { type Appointment, type Communication } from '@canvas-challenge/canvas';

import { HARDCODED_OFFICE_LOCATION_ID } from './constants';

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

const OFFICE_VISIT_CODE = '308335008';
const TELEHEALTH_VISIT_CODE = '448337001';

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
    ...(appointmentType === 'office' && {
      supportingInformation: [
        {
          reference: `Location/${HARDCODED_OFFICE_LOCATION_ID}`,
          type: 'Location',
        },
      ],
    }),
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
