import { Linking, TouchableOpacity, View } from 'react-native';
import { getPDFUrl } from '@/fhirpath/documentreference';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { getIdPartFromReference } from '@/utils/fhir';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { type DocumentReference } from '@careforge/canvas';

import { Text } from '../atoms/Text';

export const LabDetail = ({ documentReference }: { documentReference: DocumentReference }) => {
  const pdfUrl = getPDFUrl(documentReference);
  const organizationId = documentReference.custodian?.reference
    ? getIdPartFromReference(documentReference.custodian.reference)
    : undefined;

  const { data: organization } = api.organization.get.useQuery(
    {
      id: organizationId!,
    },
    {
      enabled: !!organizationId,
    },
  );

  return (
    <TouchableOpacity onPress={() => (pdfUrl ? Linking.openURL(pdfUrl) : undefined)}>
      <View className="bg-coolGray-700 border-coolGray-300 flex flex-row items-center justify-between rounded-md border px-4 py-8">
        <View className="flex flex-row items-center">
          <Ionicons name="flask" size={18} color={palette.coolGray[500]} />
          <View className="pl-2">
            <Text className="text-lg">
              {documentReference.date ? (
                <Text weight="bold">{dayjs(documentReference.date).format('ddd MM/DD/YYYY')}</Text>
              ) : null}
              {organization ? <Text> from {organization.name}</Text> : null}
            </Text>
          </View>
        </View>
        <MaterialCommunityIcons name="file-download-outline" size={24} color={palette.cyan[700]} />
      </View>
    </TouchableOpacity>
  );
};
