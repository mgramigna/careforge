import { AppointmentBundleSchema } from '..';

describe('Bundle', () => {
  it('Appointment', () => {
    const result = AppointmentBundleSchema.safeParse({
      resourceType: 'Bundle',
      type: 'searchset',
      total: 1,
      link: [
        {
          relation: 'self',
          url: '/Appointment?patient=Patient%2F199e51f869e74089a7671a1011201436&_count=10&_offset=0',
        },
        {
          relation: 'first',
          url: '/Appointment?patient=Patient%2F199e51f869e74089a7671a1011201436&_count=10&_offset=0',
        },
        {
          relation: 'last',
          url: '/Appointment?patient=Patient%2F199e51f869e74089a7671a1011201436&_count=10&_offset=0',
        },
      ],
      entry: [
        {
          resource: {
            resourceType: 'Appointment',
            id: '2edc85a9-cb29-458c-9369-683bc4679519',
            status: 'proposed',
            appointmentType: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '308335008',
                  display: 'Office Visit',
                },
              ],
            },
            reasonCode: [
              {
                text: 'testing',
              },
            ],
            description: 'testing',
            supportingInformation: [
              {
                reference: 'Location/1',
                type: 'Location',
              },
              {
                reference: 'Encounter/3c9aee07-1fec-44a5-8753-56fc8d37cb02',
                type: 'Encounter',
              },
            ],
            start: '2023-12-03T20:00:00+00:00',
            end: '2023-12-03T20:30:00+00:00',
            participant: [
              {
                actor: {
                  reference: 'Practitioner/4a61fddb30da46d78351d7f174c8cc00',
                  type: 'Practitioner',
                },
                status: 'accepted',
              },
              {
                actor: {
                  reference: 'Patient/199e51f869e74089a7671a1011201436',
                  type: 'Patient',
                },
                status: 'accepted',
              },
            ],
          },
        },
      ],
    });

    expect(result.success).toBeTruthy();
  });
});
