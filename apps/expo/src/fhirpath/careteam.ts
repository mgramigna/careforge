import { getIdPartFromReference } from '@/utils/fhir';
import fhirpath from 'fhirpath';

import { type CareTeam } from '@canvas-challenge/canvas';

export function getPractitionerFromCareTeam(careteam: CareTeam): string | null {
  const [firstCareteamMember] = fhirpath.evaluate(
    careteam,
    'participant.first().member.reference',
  ) as string[];

  return firstCareteamMember ? getIdPartFromReference(firstCareteamMember) : null;
}
