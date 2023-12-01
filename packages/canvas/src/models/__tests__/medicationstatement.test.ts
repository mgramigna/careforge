import { MedicationStatementSchema } from '..';

describe('MedicationStatement', () => {
  it('can parse the example', () => {
    const result = MedicationStatementSchema.safeParse({
      resourceType: 'MedicationStatement',
      id: 'test',
      status: 'active',
      medicationReference: {
        reference: 'Medication/fdb-449732',
        display: 'Tylenol PM Extra Strength 25 mg-500 mg tablet',
      },
      subject: {
        reference: 'Patient/b8dfa97bdcdf4754bcd8197ca78ef0f0',
      },
      context: {
        reference: 'Encounter/eae3c8a5-a129-4960-9715-fc26da30eccc',
      },
      effectivePeriod: {
        start: '2023-06-15T15:00:00-04:00',
        end: '2023-06-25T15:00:00-04:00',
      },
      dosage: [
        {
          text: '1-2 tablets once daily at bedtime as needed for restless legs',
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
