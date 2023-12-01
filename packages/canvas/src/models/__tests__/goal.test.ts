import { GoalSchema } from '..';

describe('Goal', () => {
  it('can parse the example', () => {
    const result = GoalSchema.safeParse({
      resourceType: 'Goal',
      id: 'e04a62f8-e6ab-46a1-af34-b635f901e37b',
      lifecycleStatus: 'active',
      achievementStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/goal-achievement',
            code: 'improving',
            display: 'Improving',
          },
        ],
      },
      priority: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/goal-priority',
            code: 'medium-priority',
            display: 'Medium Priority',
          },
        ],
      },
      description: {
        text: 'Drink more water',
      },
      subject: {
        reference: 'Patient/f3d750f5d77d403c96baef6a6055c6e7',
        type: 'Patient',
      },
      startDate: '2022-01-27',
      target: [
        {
          dueDate: '2023-09-28',
        },
      ],
      expressedBy: {
        reference: 'Practitioner/4150cd20de8a470aa570a852859ac87e',
        type: 'Practitioner',
      },
      note: [
        {
          id: 'c2a45d52-b3d7-4e57-bb70-2b82b8819305',
          authorReference: {
            reference: 'Practitioner/4150cd20de8a470aa570a852859ac87e',
            type: 'Practitioner',
          },
          time: '2023-09-19T20:50:25.955348+00:00',
          text: "I'm typing some things here",
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
