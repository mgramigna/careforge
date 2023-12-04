import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { ScreenView } from '@/components/molecules/ScreenView';
import { MessageThread } from '@/components/organisms/MessageThread';
import { useAuth } from '@/context/AuthContext';
import { usePatient } from '@/context/PatientContext';
import { getPractitionerFromCareTeam } from '@/fhirpath/careteam';
import { getPractitionerName } from '@/fhirpath/practitioner';
import { api } from '@/utils/api';
import { getCommunicationResource } from '@/utils/fhir';
import dayjs from 'dayjs';

import { type Communication } from '@canvas-challenge/canvas';

function getCombinedMessagesSorted({
  sent,
  received,
}: {
  sent: Communication[];
  received: Communication[];
}): Communication[] {
  return [...sent, ...received].sort((a, b) => {
    if (!a.sent || !b.sent) return 0;

    const dateA = dayjs(a.sent);
    const dateB = dayjs(b.sent);

    if (dateA.isBefore(dateB)) return -1;
    if (dateB.isBefore(dateA)) return 1;
    return 0;
  });
}

const Messages = () => {
  const { patientId } = useAuth();
  const { patient, isLoading } = usePatient();

  const utils = api.useUtils();
  const { data: sentMessages } = api.communication.search.useQuery(
    {
      sender: `Patient/${patientId}`,
    },
    {
      enabled: !!patientId,
    },
  );

  const { data: receivedMessages } = api.communication.search.useQuery(
    {
      recipient: `Patient/${patientId}`,
    },
    {
      enabled: !!patientId,
    },
  );

  const { data: patientCareteam } = api.careteam.search.useQuery(
    {
      patient: patientId!,
    },
    {
      enabled: !!patientId,
    },
  );

  const practitionerId = useMemo(() => {
    if (patientCareteam?.entry?.at(0)?.resource) {
      return getPractitionerFromCareTeam(patientCareteam.entry.at(0)!.resource);
    }

    return null;
  }, [patientCareteam]);

  const { data: practitioner } = api.practitioner.get.useQuery(
    {
      id: practitionerId!,
    },
    {
      enabled: !!practitionerId,
    },
  );

  const sendMessage = api.communication.create.useMutation({
    onSuccess: async () => {
      await utils.communication.search.invalidate();
    },
  });

  const fullThread = getCombinedMessagesSorted({
    sent: sentMessages?.entry?.map(({ resource }) => resource) ?? [],
    received: receivedMessages?.entry?.map(({ resource }) => resource) ?? [],
  });

  const sendExampleMessage = useCallback(() => {
    if (practitionerId && patientId) {
      const sender = Math.random() < 0.5 ? 'Practitioner' : 'Patient';

      const senderId = sender === 'Patient' ? patientId : practitionerId;
      const recipientId = sender === 'Patient' ? practitionerId : patientId;
      const senderType = sender;
      const recipientType = sender === 'Practitioner' ? 'Patient' : 'Practitioner';

      const communication = getCommunicationResource({
        senderId,
        senderType,
        recipientId,
        recipientType,
        message: 'Hello from an example message!',
      });

      sendMessage.mutate(communication);
    }
  }, [sendMessage, practitionerId, patientId]);

  console.log({ fullThread });

  if (isLoading) {
    return (
      <ScreenView>
        <ActivityIndicator />
      </ScreenView>
    );
  }

  return patient ? (
    <ScreenView noPadding>
      <MessageThread
        messages={fullThread}
        practitionerSenderName={
          practitioner ? getPractitionerName(practitioner) ?? 'Care Team' : 'Care Team'
        }
      />
      <Button onPress={sendExampleMessage} text="Send example message" />
    </ScreenView>
  ) : null;
};

export default Messages;
