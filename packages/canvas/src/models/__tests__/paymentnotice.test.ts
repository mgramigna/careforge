import { PaymentNoticeSchema } from '..';

describe('PaymentNotice', () => {
  it('can parse the example', () => {
    const result = PaymentNoticeSchema.safeParse({
      resourceType: 'PaymentNotice',
      id: '297e160c-8246-4054-8023-554d8e14c8c8',
      status: 'active',
      request: {
        reference: 'Patient/3f688bb915d04e168dbfa635da4ab259',
        type: 'Patient',
      },
      created: '2023-10-17T18:27:59.232743+00:00',
      payment: {
        display: 'Unused',
      },
      recipient: {
        display: 'Unused',
      },
      amount: {
        value: 25.0,
        currency: 'USD',
      },
      paymentStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/paymentstatus',
            code: 'paid',
          },
        ],
      },
    });

    expect(result.success).toBe(true);
  });
});
