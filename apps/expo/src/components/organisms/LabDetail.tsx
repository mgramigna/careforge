import { Linking } from 'react-native';
import { getPDFUrl } from '@/fhirpath/documentreference';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { getIdPartFromReference } from '@/utils/fhir';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { type DocumentReference } from '@careforge/canvas';

import { Text } from '../atoms/Text';
import { DetailCard } from '../molecules/DetailCard';

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
    <DetailCard
      leftIcon={<Ionicons name="flask" size={18} color={palette.coolGray[500]} />}
      rightIcon={
        <MaterialCommunityIcons name="file-download-outline" size={24} color={palette.cyan[700]} />
      }
      onPress={() => (pdfUrl ? Linking.openURL(pdfUrl) : undefined)}
      text={
        <>
          {documentReference.date ? (
            <Text weight="bold">{dayjs(documentReference.date).format('ddd MM/DD/YYYY')}</Text>
          ) : null}
          {organization ? <Text> from {organization.name}</Text> : null}
        </>
      }
    />
  );
};
