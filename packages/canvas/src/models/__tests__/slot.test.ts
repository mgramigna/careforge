import { SlotSchema } from '..';

describe('Slot', () => {
  it('can parse the example', () => {
    const result = SlotSchema.safeParse({
      resourceType: 'Slot',
      id: 'test',
      schedule: {
        reference: 'Schedule/Location.2-Staff.3640cd20de8a470aa570a852859ac87e',
        type: 'Schedule',
      },
      status: 'free',
      start: '2023-09-21T08:45:00-07:00',
      end: '2023-09-21T09:05:00-07:00',
    });

    expect(result.success).toBe(true);
  });
});
