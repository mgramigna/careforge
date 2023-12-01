import { OrganizationSchema } from '..';

describe('Organization', () => {
  it('can parse the example', () => {
    const result = OrganizationSchema.safeParse({
      resourceType: 'Organization',
      id: 'bcf685dd-f71e-49da-b471-1ee322a8d9f4',
      identifier: [
        {
          system: 'http://hl7.org.fhir/sid/us-npi',
          value: '1144221847',
        },
      ],
      active: true,
      name: 'Acme Labs',
      telecom: [
        {
          system: 'fax',
          value: '5558675310',
          use: 'work',
        },
        {
          system: 'phone',
          value: '5558675309',
          use: 'work',
        },
        {
          system: 'email',
          value: 'hq@acme.org',
          use: 'work',
        },
      ],
      address: [
        {
          use: 'work',
          type: 'both',
          line: ['3300 Washtenaw Avenue, Suite 227'],
          city: 'Amherst',
          state: 'MA',
          postalCode: '01002',
          country: 'USA',
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
