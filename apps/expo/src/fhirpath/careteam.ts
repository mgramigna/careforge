import { getIdPartFromReference } from '@/utils/fhir';
import fhirpath from 'fhirpath';

import { type CareTeam } from '@careforge/canvas';

const PCP_SYSTEM = 'http://snomed.info/sct';
const PCP_CODE = '446050000';

export function getPractitionerFromCareTeam(careteam: CareTeam): string | null {
  const expr = fhirpath.compile(
    `participant.where(role.coding.code='${PCP_CODE}' and role.coding.system='${PCP_SYSTEM}').member.reference`,
  );
  const [pcp] = expr(careteam) as string[];

  return pcp ? getIdPartFromReference(pcp) : null;
}
