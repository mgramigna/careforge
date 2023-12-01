import { GroupSchema } from '..';

describe('Group', () => {
  it('can parse the example', () => {
    const result = GroupSchema.safeParse({
      resourceType: 'Group',
      id: '3340c331-d446-4700-9c23-7959bd393f26',
      type: 'practitioner',
      actual: true,
      name: 'A Test Team',
      characteristic: [
        {
          code: {
            text: 'responsibility',
          },
          valueCodeableConcept: {
            text: 'COLLECT_SPECIMENS_FROM_PATIENT',
          },
          exclude: false,
        },
      ],
      member: [
        {
          entity: {
            reference: 'Practitioner/76428138e7644ce6b7eb426fdbbf2f39',
            type: 'Practitioner',
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
