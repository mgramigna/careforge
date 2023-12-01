import { CommunicationSchema } from '..';

describe('Communication', () => {
  it('can parse the example', () => {
    const result = CommunicationSchema.safeParse({
      resourceType: 'Communication',
      id: '17b7d61e-4b0e-4940-bd37-b64f5c2ae29d',
      status: 'unknown',
      sent: '2023-10-23T21:19:22.865089+00:00',
      recipient: [
        {
          reference: 'Practitioner/3640cd20de8a470aa570a852859ac87e',
          type: 'Practitioner',
        },
      ],
      sender: {
        reference: 'Patient/43f1418bae9c41919203e0006761067c',
        type: 'Patient',
      },
      payload: [
        {
          contentString: "What's up doc?",
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
