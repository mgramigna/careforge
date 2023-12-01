import { AllergyIntoleranceSchema } from '..';

describe('AllergyIntolerance', () => {
  it('can parse the example', () => {
    const result = AllergyIntoleranceSchema.safeParse({
      resourceType: 'AllergyIntolerance',
      id: '3340c331-d446-4700-9c23-7959bd393f26',
      clinicalStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
            code: 'active',
            display: 'Active',
          },
        ],
        text: 'Active',
      },
      verificationStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification',
            code: 'confirmed',
            display: 'Confirmed',
          },
        ],
        text: 'Confirmed',
      },
      type: 'allergy',
      code: {
        coding: [
          {
            system: 'http://www.fdbhealth.com/',
            code: '2-15588',
            display: 'Allergy Medicine',
          },
        ],
        text: 'Allergy Medicine',
      },
      patient: {
        reference: 'Patient/b8dfa97bdcdf4754bcd8197ca78ef0f0',
      },
      encounter: {
        reference: 'Encounter/eae3c8a5-a129-4960-9715-fc26da30eccc',
      },
      onsetDateTime: '2023-06-15',
      recorder: {
        reference: 'Practitioner/76428138e7644ce6b7eb426fdbbf2f39',
      },
      lastOccurrence: '2023-06-17',
      note: [
        {
          text: 'AllergyIntolerance note',
        },
      ],
      reaction: [
        {
          manifestation: [
            {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/data-absent-reason',
                  code: 'unknown',
                  display: 'Unknown',
                },
              ],
              text: 'Unknown',
            },
          ],
          severity: 'moderate',
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
