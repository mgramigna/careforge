import { ObservationSchema } from '..';

describe('Observation', () => {
  it('can parse the example', () => {
    const result = ObservationSchema.safeParse({
      resourceType: 'Observation',
      id: '43b74793-5de6-435a-871d-8ae2232f3aa0',
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/observation-category',
              code: 'vital-signs',
              display: 'Vital Signs',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '85353-1',
          },
        ],
      },
      subject: {
        reference: 'Patient/a1197fa9e65b4a5195af15e0234f61c2',
        type: 'Patient',
      },
      effectiveDateTime: '2022-06-28T20:18:54.141759+00:00',
      issued: '2022-06-28T20:43:10.465819+00:00',
      dataAbsentReason: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/data-absent-reason',
            code: 'not-performed',
            display: 'Not Performed',
          },
        ],
      },
      hasMember: [
        {
          reference: 'Observation/40cec197-041f-4db5-bd12-addbfb68c3b3',
          type: 'Observation',
        },
        {
          reference: 'Observation/5fa47fbe-eeb3-43c8-a287-11b18cad40b7',
          type: 'Observation',
        },
        {
          reference: 'Observation/4533ad2e-7ea4-4ae9-8018-301e1b99dcbb',
          type: 'Observation',
        },
        {
          reference: 'Observation/8f2c43eb-feeb-49c8-b509-b67fb1ecca51',
          type: 'Observation',
        },
        {
          reference: 'Observation/6a908edf-f75c-4a40-87cb-347d8a753bae',
          type: 'Observation',
        },
        {
          reference: 'Observation/2966fcba-be4e-4400-bd4a-aa7051ee38c6',
          type: 'Observation',
        },
        {
          reference: 'Observation/89edc763-4129-4d6c-94c7-6a3bcf1c776f',
          type: 'Observation',
        },
        {
          reference: 'Observation/f578d894-cfe2-49c2-88d2-48f5109ceed9',
          type: 'Observation',
        },
        {
          reference: 'Observation/2e368a90-8038-49c4-a26e-ebebdb736269',
          type: 'Observation',
        },
        {
          reference: 'Observation/b93d554a-b54b-4375-b531-e4f6337dc42d',
          type: 'Observation',
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
