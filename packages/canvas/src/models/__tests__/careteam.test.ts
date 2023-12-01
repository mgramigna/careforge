import { CareTeamSchema } from '..';

describe('CareTeam', () => {
  it('can parse the example', () => {
    const result = CareTeamSchema.safeParse({
      resourceType: 'CareTeam',
      id: '8ab7cc3c86f54723ba267baf1f906ec7',
      status: 'active',
      name: 'Care Team for Amy V. Shaw',
      subject: {
        reference: 'Patient/example',
        type: 'Patient',
        display: 'Amy V. Shaw',
      },
      participant: [
        {
          role: [
            {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '17561000',
                  display: 'Cardiologist',
                },
              ],
            },
          ],
          member: {
            reference: 'Practitioner/c2ff4546548e46ab8959af887b563eab',
            display: 'Ronald Bone, MD',
          },
        },
        {
          role: [
            {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '453231000124104',
                  display: 'Primary care provider',
                },
              ],
            },
          ],
          member: {
            reference: 'Practitioner/fc87cbb2525f4c5eb50294f620c7a15e',
            display: 'Kathy Fielding, MD',
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
