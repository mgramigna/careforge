import { CoverageEligibilityResponseSchema } from '..';

describe('CoverageEligibilityResponse', () => {
  it('can parse the example', () => {
    const result = CoverageEligibilityResponseSchema.safeParse({
      resourceType: 'CoverageEligibilityResponse',
      id: '9ad12f4e-4f35-4f54-8b4f-036516488191',
      status: 'active',
      purpose: ['benefits'],
      patient: {
        reference: 'Patient/b41c7cda738d440cb55e0e6cb67499a1',
        type: 'Patient',
      },
      created: '2023-09-19T18:16:39.551617+00:00',
      request: {
        reference: 'CoverageEligibilityRequest/d7254641-e363-488c-91fa-b93a6170b9e0',
        type: 'CoverageEligibilityRequest',
      },
      outcome: 'complete',
      insurer: {
        identifier: '1111',
        display: 'Payer ID: 1111',
      },
      insurance: [
        {
          coverage: {
            reference: 'Coverage/4a86f580-e192-489a-a9f0-7c915fc67111',
            type: 'Coverage',
          },
          item: [
            {
              network: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-network',
                    code: 'in',
                    display: 'In Network',
                  },
                ],
                text: 'In Network',
              },
              unit: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-unit',
                    code: 'individual',
                    display: 'Individual',
                  },
                ],
                text: 'Individual',
              },
              benefit: [
                {
                  type: {
                    text: 'Co-Payment',
                  },
                  allowedMoney: {
                    value: 333,
                  },
                },
                {
                  type: {
                    text: 'Co-Insurance',
                  },
                  allowedString: '0.0%',
                },
              ],
            },
            {
              network: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-network',
                    code: 'in',
                    display: 'In Network',
                  },
                ],
                text: 'In Network',
              },
              unit: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-unit',
                    code: 'individual',
                    display: 'Individual',
                  },
                ],
                text: 'Individual',
              },
              benefit: [
                {
                  type: {
                    text: 'Co-Insurance',
                  },
                  allowedString: '0.0%',
                },
                {
                  type: {
                    text: 'Co-Insurance',
                  },
                  allowedString: '0.0%',
                },
                {
                  type: {
                    text: 'Co-Insurance',
                  },
                  allowedString: '0.0%',
                },
              ],
            },
            {
              benefit: [
                {
                  type: {
                    text: 'Benefit Description (Incomplete information)',
                  },
                },
              ],
            },
            {
              benefit: [
                {
                  type: {
                    text: 'Active Coverage',
                  },
                },
              ],
            },
            {
              network: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-network',
                    code: 'in',
                    display: 'In Network',
                  },
                ],
                text: 'In Network',
              },
              benefit: [
                {
                  type: {
                    text: 'Active Coverage',
                  },
                },
                {
                  type: {
                    text: 'Primary Care Provider (Incomplete information)',
                  },
                },
                {
                  type: {
                    text: 'Benefit Description (Incomplete information)',
                  },
                },
                {
                  type: {
                    text: 'Benefit Disclaimer (Incomplete information)',
                  },
                },
              ],
            },
            {
              name: 'Dental Care',
              network: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-network',
                    code: 'in',
                    display: 'In Network',
                  },
                ],
                text: 'In Network',
              },
              unit: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-unit',
                    code: 'individual',
                    display: 'Individual',
                  },
                ],
                text: 'Individual',
              },
              benefit: [
                {
                  type: {
                    text: 'Active Coverage',
                  },
                },
              ],
            },
            {
              name: 'Health Benefit Plan Coverage',
              network: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-network',
                    code: 'in',
                    display: 'In Network',
                  },
                ],
                text: 'In Network',
              },
              unit: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-unit',
                    code: 'individual',
                    display: 'Individual',
                  },
                ],
                text: 'Individual',
              },
              benefit: [
                {
                  type: {
                    text: 'Deductible (Incomplete information)',
                  },
                },
                {
                  type: {
                    text: 'Deductible',
                  },
                  allowedMoney: {
                    value: 6900,
                  },
                  usedMoney: {
                    value: 0.0,
                  },
                },
                {
                  type: {
                    text: 'Active Coverage',
                  },
                },
                {
                  type: {
                    text: 'Out of Pocket (Stop Loss)',
                  },
                  allowedMoney: {
                    value: 6900,
                  },
                  usedMoney: {
                    value: 0.0,
                  },
                },
                {
                  type: {
                    text: 'Out of Pocket (Stop Loss)',
                  },
                  allowedMoney: {
                    value: 6900,
                  },
                  usedMoney: {
                    value: 0.0,
                  },
                },
              ],
            },
            {
              name: 'Health Benefit Plan Coverage',
              network: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-network',
                    code: 'in',
                    display: 'In Network',
                  },
                ],
                text: 'In Network',
              },
              benefit: [
                {
                  type: {
                    text: 'Benefit Description (Incomplete information)',
                  },
                },
              ],
            },
            {
              name: 'Physician Visit - Well',
              network: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-network',
                    code: 'in',
                    display: 'In Network',
                  },
                ],
                text: 'In Network',
              },
              benefit: [
                {
                  type: {
                    text: 'Non-Covered (Incomplete information)',
                  },
                },
              ],
            },
            {
              name: 'Professional (Physician) Visit - Office',
              network: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-network',
                    code: 'in',
                    display: 'In Network',
                  },
                ],
                text: 'In Network',
              },
              unit: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-unit',
                    code: 'individual',
                    display: 'Individual',
                  },
                ],
                text: 'Individual',
              },
              benefit: [
                {
                  type: {
                    text: 'Co-Insurance',
                  },
                  allowedString: '0.0%',
                },
              ],
            },
            {
              name: 'Professional (Physician) Visit - Office',
              network: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/benefit-network',
                    code: 'in',
                    display: 'In Network',
                  },
                ],
                text: 'In Network',
              },
              benefit: [
                {
                  type: {
                    text: 'Non-Covered (Incomplete information)',
                  },
                },
                {
                  type: {
                    text: 'Active Coverage',
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
