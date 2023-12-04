import fhirpath from 'fhirpath';

import { type Communication } from '@canvas-challenge/canvas';

export function getCommunicationStringPayload(communication: Communication): string {
  const [messageText] = fhirpath.evaluate(communication, 'payload.contentString') as string[];

  return messageText ?? '';
}
