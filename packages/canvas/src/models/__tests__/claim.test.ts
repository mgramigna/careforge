import { ClaimSchema } from '..';

describe('Claim', () => {
  it('can parse the example', () => {
    const result = ClaimSchema.safeParse({
      resourceType: 'Claim',
      id: 'test',
      status: 'active',
      type: {
        coding: [
          {
            system: 'http://hl7.org/fhir/ValueSet/claim-type',
            code: 'professional',
          },
        ],
      },
      use: 'claim',
      patient: {
        reference: 'Patient/b3084f7e884e4af2b7e23b1dca494abd',
        type: 'Patient',
      },
      created: '2021-08-16',
      provider: {
        reference: 'Practitioner/4150cd20de8a470aa570a852859ac87e',
        type: 'Practitioner',
      },
      priority: {
        coding: [
          {
            code: 'normal',
            system: 'http://hl7.org/fhir/ValueSet/process-priority',
          },
        ],
      },
      supportingInfo: [
        {
          sequence: 1,
          category: {
            coding: [
              {
                code: 'patientreasonforvisit',
                system: 'http://hl7.org/fhir/ValueSet/claim-informationcategory',
                display: 'Patient Reason for Visit',
              },
            ],
          },
          valueString: 'This is only...a test',
        },
      ],
      diagnosis: [
        {
          sequence: 1,
          diagnosisCodeableConcept: {
            coding: [
              {
                code: 'F41.1',
                system: 'http://hl7.org/fhir/ValueSet/icd-10',
                display: 'Generalized anxiety',
              },
            ],
          },
        },
      ],
      insurance: [
        {
          sequence: 1,
          focal: true,
          coverage: {
            reference: 'Coverage/02d4f77a-ebaf-47d5-b162-6313244aed5f',
          },
        },
      ],
      item: [
        {
          sequence: 1,
          diagnosisSequence: [1],
          productOrService: {
            coding: [
              {
                system: 'http://hl7.org/fhir/us/core/ValueSet/us-core-procedure-code',
                code: 'exam',
                display: 'Office visit',
              },
            ],
          },
          modifier: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/us/carin-bb/ValueSet/AMACPTCMSHCPCSModifiers',
                  code: '21',
                },
              ],
            },
          ],
          quantity: {
            value: 1,
          },
          unitPrice: {
            value: 75,
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
