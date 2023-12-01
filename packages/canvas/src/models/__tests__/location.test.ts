import { LocationSchema } from '..';

describe('Location', () => {
  it('can parse the example', () => {
    const result = LocationSchema.safeParse({
      resourceType: 'Location',
      id: 'a04b44ec-c7df-4808-9043-e9c4b1d352a9',
      identifier: [
        {
          system: 'http://hl7.org/fhir/sid/us-npi',
          value: '12321',
        },
      ],
      status: 'active',
      name: 'Canvas Medical',
      alias: ['Canvas Medical HQ'],
      description: 'Canvas Medical, San Francisco, CA',
      address: {
        use: 'work',
        line: ['405 49th St'],
        city: 'Oakland',
        state: 'CA',
        postalCode: '94609',
        country: 'USA',
      },
    });

    expect(result.success).toBe(true);
  });
});
