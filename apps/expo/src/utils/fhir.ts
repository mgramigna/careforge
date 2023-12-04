import { type Communication } from '@canvas-challenge/canvas';

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
