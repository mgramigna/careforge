import { CoverageEligibilityRequestSchema } from '..';

describe('CoverageEligibilityRequest', () => {
  it('can parse the example', () => {
    const result = CoverageEligibilityRequestSchema.safeParse({
      resourceType: 'CoverageEligibilityRequest',
      id: 'test',
      status: 'active',
      purpose: ['benefits'],
      patient: {
        reference: 'Patient/9713f5a3c8464a2587912e80bc2dd938',
      },
      created: '2023-09-19',
      insurer: {},
      insurance: [
        {
          focal: true,
          coverage: {
            reference: 'Coverage/743aa331-2f85-420b-ab10-8a6b7bb6a1cf',
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
