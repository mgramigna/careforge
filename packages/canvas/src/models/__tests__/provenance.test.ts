import { ProvenanceSchema } from '..';

describe('Provenance', () => {
  it('can parse the example', () => {
    const result = ProvenanceSchema.safeParse({
      resourceType: 'Provenance',
      id: 'db1631ed-bcd3-4e43-84a1-7e507e8aa44c',
      target: [
        {
          reference: 'Patient/b8dfa97bdcdf4754bcd8197ca78ef0f0',
          type: 'Patient',
        },
      ],
      recorded: '2023-09-18T14:42:14.981528+00:00',
      activity: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v3-DataOperation',
            code: 'CREATE',
          },
        ],
      },
      agent: [
        {
          type: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/provenance-participant-type',
                code: 'composer',
                display: 'Composer',
              },
            ],
          },
          who: {
            reference: 'Organization/00000000-0000-0000-0002-000000000000',
            type: 'Organization',
            display: 'Canvas Medical',
          },
          onBehalfOf: {
            reference: 'Organization/00000000-0000-0000-0002-000000000000',
            type: 'Organization',
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
