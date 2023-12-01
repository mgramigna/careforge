import { ProcedureSchema } from '..';

describe('Procedure', () => {
  it('can parse the example', () => {
    const result = ProcedureSchema.safeParse({
      resourceType: 'Procedure',
      id: '2dd9a3bc-a3bb-472b-aaef-c57be394de39',
      status: 'unknown',
      code: {
        coding: [
          {
            system: 'http://www.ama-assn.org/go/cpt',
            code: '23066',
            display: 'Biopsy soft tissue shoulder deep',
          },
        ],
      },
      subject: {
        reference: 'Patient/b8dfa97bdcdf4754bcd8197ca78ef0f0',
        type: 'Patient',
      },
      performedDateTime: '2023-09-20T21:18:54.263690+00:00',
    });

    expect(result.success).toBe(true);
  });
});
