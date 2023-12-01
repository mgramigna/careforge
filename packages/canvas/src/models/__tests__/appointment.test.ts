import { AppointmentSchema } from '..';

describe('Appointment', () => {
  it('can parse the example', () => {
    const result = AppointmentSchema.safeParse({
      resourceType: 'Appointment',
      id: '621a66fc-9d5c-4de0-97fb-935d611ac176',
      contained: [
        {
          resourceType: 'Endpoint',
          id: 'appointment-meeting-endpoint-0',
          status: 'active',
          connectionType: {
            code: 'https',
          },
          payloadType: [
            {
              coding: [
                {
                  code: 'video-call',
                },
              ],
            },
          ],
          address: 'https://url-for-video-chat.example.com?meeting=abc123',
        },
      ],
      status: 'proposed',
      appointmentType: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '448337001',
            display: 'Telemedicine',
          },
        ],
      },
      reasonCode: [
        {
          coding: [
            {
              system: 'INTERNAL',
              code: 'INIV',
              display: 'Initial Visit',
              userSelected: false,
            },
          ],
          text: 'Initial 30 Minute Visit',
        },
      ],
      description: 'Initial 30 Minute Visit',
      supportingInformation: [
        {
          reference: 'Location/1',
          type: 'Location',
        },
        {
          reference: '#appointment-meeting-endpoint-0',
          type: 'Endpoint',
        },
        {
          reference: 'Encounter/23668e1a-e914-4eac-885c-1a2a27244ab7',
          type: 'Encounter',
        },
      ],
      start: '2023-10-24T13:30:00+00:00',
      end: '2023-10-24T14:00:00+00:00',
      participant: [
        {
          actor: {
            reference: 'Practitioner/4150cd20de8a470aa570a852859ac87e',
            type: 'Practitioner',
          },
          status: 'accepted',
        },
        {
          actor: {
            reference: 'Patient/ee1c7803325b47b492008f3e7c9d7a3d',
            type: 'Patient',
          },
          status: 'accepted',
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
