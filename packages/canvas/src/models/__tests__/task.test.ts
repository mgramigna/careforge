import { TaskSchema } from '..';

describe('Task', () => {
  it('can parse the example', () => {
    const result = TaskSchema.safeParse({
      resourceType: 'Task',
      id: 'test',
      extension: [
        {
          url: 'http://schemas.canvasmedical.com/fhir/extensions/task-group',
          valueReference: {
            reference: 'Group/0c59ba86-dd40-4fde-8179-6e0b91dc617b',
          },
        },
      ],
      status: 'completed',
      description: 'Ask patient for new insurance information.',
      for: { reference: 'Patient/cfd91cd3bd9046db81199aa8ee4afd7f' },
      authoredOn: '2023-09-22T14:00:00.000Z',
      requester: { reference: 'Practitioner/4150cd20de8a470aa570a852859ac87e' },
      owner: { reference: 'Practitioner/a02cbf2403e140f7bc9a355c6ed420f3' },
      intent: 'unknown',
      restriction: { period: { end: '2023-09-23T14:00:00.000Z' } },
      note: [
        {
          text: 'Please call patient to update insurance information.',
          time: '2023-09-22T14:00:00.000Z',
          authorReference: { reference: 'Practitioner/4150cd20de8a470aa570a852859ac87e' },
        },
      ],
      input: [
        {
          type: { text: 'label' },
          valueString: 'Urgent',
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
