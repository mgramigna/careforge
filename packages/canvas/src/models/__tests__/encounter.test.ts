import { EncounterSchema } from '..';

describe('Encounter', () => {
  it('can parse the example', () => {
    const result = EncounterSchema.safeParse({
      resourceType: 'Encounter',
      id: '7720a218-c0bd-4cee-82a2-729bd9c101f3',
      identifier: [
        {
          id: '7720a218-c0bd-4cee-82a2-729bd9c101f3',
          system: 'http://canvasmedical.com',
          value: '7720a218-c0bd-4cee-82a2-729bd9c101f3',
        },
      ],
      status: 'in-progress',
      class: {
        system: 'https://www.hl7.org/fhir/v3/ActEncounterCode/vs.html',
      },
      type: [
        {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '308335008',
              display: 'Office Visit',
            },
          ],
        },
      ],
      subject: {
        reference: 'Patient/a1197fa9e65b4a5195af15e0234f61c2',
        type: 'Patient',
      },
      participant: [
        {
          type: [
            {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
                  code: 'PART',
                  display: 'Participation',
                },
              ],
            },
          ],
          period: {
            start: '2022-04-04T05:26:34.711718+00:00',
          },
          individual: {
            reference: 'Practitioner/4150cd20de8a470aa570a852859ac87e',
            type: 'Practitioner',
            display: 'Canvas Support MD',
          },
        },
      ],
      period: {
        start: '2022-04-04T05:26:34.711718+00:00',
      },
      reasonCode: [
        {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '308335008',
              display: 'Patient encounter procedure (procedure)',
            },
          ],
        },
      ],
      reasonReference: [
        {
          reference: 'Condition/b06982fa-9bcb-4695-a2f4-09cfdb21f03d',
          type: 'Condition',
        },
        {
          reference: 'Condition/e3df5e12-8ea4-46f8-922e-89a229945ef4',
          type: 'Condition',
        },
        {
          reference: 'Condition/266eae2b-4983-42b7-94ca-1397f80a7968',
          type: 'Condition',
        },
      ],
      hospitalization: {
        dischargeDisposition: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/discharge-disposition',
              code: 'oth',
              display: 'Other',
            },
          ],
        },
      },
      location: [
        {
          location: {
            reference: 'Location/50ea08f9-f4a5-4315-90e3-10d38922daa8',
            type: 'Location',
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
