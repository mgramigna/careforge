import { PractitionerSchema } from '..';

describe('Practitioner', () => {
  it('can parse the example', () => {
    const result = PractitionerSchema.safeParse({
      resourceType: 'Practitioner',
      id: 'e766816672f34a5b866771c773e38f3c',
      identifier: [
        {
          system: 'http://hl7.org/fhir/sid/us-npi',
          value: '3554694505',
        },
      ],
      name: [
        {
          use: 'usual',
          text: 'Youta Priti MD',
          family: 'Priti',
          given: ['Youta'],
        },
      ],
      address: [
        {
          use: 'work',
          line: ['405 49th St'],
          city: 'Oakland',
          state: 'CA',
          postalCode: '94609',
          country: 'USA',
        },
      ],
      qualification: [
        {
          identifier: [
            {
              system: 'http://www.mbc.ca.gov/',
              value: 'A60695',
            },
          ],
          code: {
            text: 'License',
          },
          period: {
            start: '2017-07-11',
            end: '2019-07-11',
          },
          issuer: {
            extension: [
              {
                url: 'http://schemas.canvasmedical.com/fhir/extensions/issuing-authority-short-name',
                valueString: 'MEDICAL BOARD OF CALIFORNIA',
              },
            ],
            display: 'MEDICAL BOARD OF CALIFORNIA',
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
