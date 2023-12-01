import { ConsentSchema } from '..';

describe('Consent', () => {
  it('can parse the example', () => {
    const result = ConsentSchema.safeParse({
      resourceType: 'Consent',
      id: 'a9d3c0d9-e87a-4737-b909-ac81ee62f9a0',
      status: 'inactive',
      scope: {
        text: 'Unknown',
      },
      category: [
        {
          coding: [
            {
              system: 'internal',
              display: 'Restraints',
            },
          ],
        },
      ],
      patient: {
        reference: 'Patient/2c4b29a411b043bfb1c34c8c3683c7ca',
        type: 'Patient',
      },
      dateTime: '2022-04-13T14:43:32.317476+00:00',
      sourceAttachment: {
        url: 'https://canvas-client-media.s3.amazonaws.com/training/20220330_211811_60.pdf?AWSAccessKeyId=AKIAQB7SIDR7EI2V32FZ&Signature=h68Xavx0JLoA7zUhBA4bnSeVCvQ%3D&Expires=1693416882',
      },
      provision: {
        period: {
          start: '2022-04-13',
          end: '2022-12-31',
        },
      },
    });

    expect(result.success).toBe(true);
  });
});
