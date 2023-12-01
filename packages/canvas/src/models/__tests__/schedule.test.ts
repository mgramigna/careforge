import { ScheduleSchema } from '..';

describe('Schedule', () => {
  it('can parse the example', () => {
    const result = ScheduleSchema.safeParse({
      resourceType: 'Schedule',
      id: 'Location.1-Staff.e766816672f34a5b866771c773e38f3c',
      text: {
        status: 'generated',
        div: '<div>Schedule for Youta Priti MD at California</div>',
      },
      actor: [
        {
          reference: 'Practitioner/e766816672f34a5b866771c773e38f3c',
          type: 'Practitioner',
        },
      ],
      comment: 'Schedule for Youta Priti MD at California',
    });

    expect(result.success).toBe(true);
  });
});
