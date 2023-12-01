import { ConditionSchema } from '..';

describe('Condition', () => {
  it('can parse the example', () => {
    const result = ConditionSchema.safeParse({
      resourceType: 'Condition',
      id: '3340c331-d446-4700-9c23-7959bd393f26',
      clinicalStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
            code: 'resolved',
            display: 'Resolved',
          },
        ],
        text: 'Resolved',
      },
      verificationStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
            code: 'confirmed',
            display: 'Confirmed',
          },
        ],
        text: 'Confirmed',
      },
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/condition-category',
              code: 'encounter-diagnosis',
              display: 'Encounter Diagnosis',
            },
          ],
          text: 'Encounter Diagnosis',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://hl7.org/fhir/sid/icd-10-cm',
            code: 'V97.21XS',
            display: 'Parachutist entangled in object, sequela',
          },
        ],
        text: 'Parachutist entangled in object, sequela',
      },
      subject: {
        reference: 'Patient/b8dfa97bdcdf4754bcd8197ca78ef0f0',
      },
      encounter: {
        reference: 'Encounter/eae3c8a5-a129-4960-9715-fc26da30eccc',
      },
      onsetDateTime: '2023-06-15',
      abatementDateTime: '2023-06-17',
      recordedDate: '2023-06-18T15:00:00-04:00',
      recorder: {
        reference: 'Practitioner/76428138e7644ce6b7eb426fdbbf2f39',
      },
      note: [
        {
          text: 'Condition note',
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
