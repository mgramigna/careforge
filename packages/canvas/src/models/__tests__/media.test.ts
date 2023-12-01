import { MediaSchema } from '..';

describe('Media', () => {
  it('can parse the example', () => {
    const result = MediaSchema.safeParse({
      resourceType: 'Media',
      id: '729e5242-bad6-4bd7-905d-9716ae262971',
      status: 'completed',
      subject: {
        reference: 'Patient/b8dfa97bdcdf4754bcd8197ca78ef0f0',
        type: 'Patient',
      },
      encounter: {
        reference: 'Encounter/eae3c8a5-a129-4960-9715-fc26da30eccc',
      },
      operator: {
        reference: 'Practitioner/76428138e7644ce6b7eb426fdbbf2f39',
      },
      content: {
        contentType: 'image/jpeg',
        url: 'https://canvas-client-media.s3.amazonaws.com/example/20231004_154853_07a4ecdae69d4870b6f60398b28e2839.jpg?AWSAccessKeyId=AKIAQB7SIDR7G73XKHCY&Signature=l3gnPv9wgYhdaZ2ba5RlZYrFCu0%3D&Expires=1696473402',
        title: 'Image title',
      },
      note: [
        {
          text: 'Note #1',
        },
        {
          text: 'Note #2',
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
