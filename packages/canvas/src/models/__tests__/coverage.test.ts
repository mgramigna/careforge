import { CoverageSchema } from '..';

describe('Coverage', () => {
  it('can parse the example', () => {
    const result = CoverageSchema.safeParse({
      resourceType: 'Coverage',
      id: 'a7c6af04-a22f-47bf-9cc8-d41158b2ad62',
      status: 'active',
      type: {
        coding: [
          {
            system: 'http://hl7.org/fhir/ValueSet/coverage-type',
            code: 'MILITARY',
            display: 'Military health program',
          },
        ],
      },
      subscriber: {
        reference: 'Patient/b3084f7e884e4af2b7e23b1dca494abd',
        type: 'Patient',
      },
      subscriberId: '12345',
      beneficiary: {
        reference: 'Patient/b3084f7e884e4af2b7e23b1dca494abd',
        type: 'Patient',
      },
      relationship: {
        coding: [
          {
            system: 'http://hl7.org/fhir/ValueSet/subscriber-relationship',
            code: 'self',
            display: 'Self',
          },
        ],
        text: '18',
      },
      period: {
        start: '2023-09-19',
      },
      payor: [
        {
          reference: 'Organization/c152eeb7-f204-4e28-acb5-c7e85390b17e',
          type: 'Organization',
          display: ' Custody Medical Services Program',
        },
      ],
      class: [
        {
          type: {
            coding: [
              {
                system: 'http://hl7.org/fhir/ValueSet/coverage-class',
                code: 'plan',
              },
            ],
          },
          value: 'Starfleet HMO',
        },
        {
          type: {
            coding: [
              {
                system: 'http://hl7.org/fhir/ValueSet/coverage-class',
                code: 'subplan',
              },
            ],
          },
          value: 'Stars',
        },
        {
          type: {
            coding: [
              {
                system: 'http://hl7.org/fhir/ValueSet/coverage-class',
                code: 'group',
              },
            ],
          },
          value: 'Captains Only',
        },
        {
          type: {
            coding: [
              {
                system: 'http://hl7.org/fhir/ValueSet/coverage-class',
                code: 'subgroup',
              },
            ],
          },
          value: 'Subgroup 2',
        },
      ],
      order: 1,
    });

    expect(result.success).toBe(true);
  });
});
