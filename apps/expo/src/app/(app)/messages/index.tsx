import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from '@/components/atoms/TextInput';
import { ScreenView } from '@/components/molecules/ScreenView';
import { MessageThread } from '@/components/organisms/MessageThread';
import { useAuth } from '@/context/AuthContext';
import { usePatient } from '@/context/PatientContext';
import { getPractitionerFromCareTeam } from '@/fhirpath/careteam';
import { getPractitionerName } from '@/fhirpath/practitioner';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { getCommunicationResource } from '@/utils/fhir';
import { Ionicons } from '@expo/vector-icons';
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

    // List is inverted, so place the oldest messages first
    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;
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

  const sendMessageMutation = api.communication.create.useMutation({
    onSuccess: async () => {
      await utils.communication.search.invalidate();
      setMessageText('');
      Keyboard.dismiss();
    },
  });

  const fullThread = getCombinedMessagesSorted({
    sent: sentMessages?.entry?.map(({ resource }) => resource) ?? [],
    received: receivedMessages?.entry?.map(({ resource }) => resource) ?? [],
  });

  const [messageText, setMessageText] = useState('');

  const sendMessage = useCallback(() => {
    if (practitionerId && patientId) {
      const communication = getCommunicationResource({
        senderId: patientId,
        senderType: 'Patient',
        recipientId: practitionerId,
        recipientType: 'Practitioner',
        message: messageText,
      });

      sendMessageMutation.mutate(communication);
    }
  }, [sendMessageMutation, practitionerId, patientId, messageText]);

  if (isLoading) {
    return (
      <ScreenView>
        <ActivityIndicator />
      </ScreenView>
    );
  }

  return patient ? (
    <ScreenView noPadding>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Constants.statusBarHeight + 48}
      >
        <MessageThread
          messages={fullThread}
          practitionerSenderName={
            practitioner ? getPractitionerName(practitioner) ?? 'Care Team' : 'Care Team'
          }
        />
        <View className="flex flex-row items-center py-4 pl-2">
          <TextInput
            value={messageText}
            onChangeText={setMessageText}
            className="bg-coolGray-100 flex-1 rounded-full p-4"
            placeholder="Message your care team..."
            onSubmitEditing={() => {
              if (messageText !== '') {
                sendMessage();
              }
            }}
          />
          <TouchableOpacity disabled={messageText === ''} onPress={sendMessage}>
            <Ionicons
              name={messageText !== '' ? 'arrow-forward-circle' : 'arrow-forward-circle-outline'}
              size={32}
              className="px-6"
              color={palette.cyan[600]}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenView>
  ) : null;
};

export default Messages;
