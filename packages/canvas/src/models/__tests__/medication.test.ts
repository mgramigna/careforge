import { MedicationSchema } from '..';

describe('Medication', () => {
  it('can parse the example', () => {
    const result = MedicationSchema.safeParse({
      resourceType: 'Medication',
      id: 'fdb-449732',
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml">Tylenol PM Extra Strength 25 mg-500 mg tablet</div>',
      },
      code: {
        coding: [
          {
            system: 'http://www.fdbhealth.com/',
            code: '449732',
            display: 'Tylenol PM Extra Strength 25 mg-500 mg tablet',
          },
          {
            system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
            code: '1092189',
            display: 'Tylenol PM Extra Strength 25 mg-500 mg tablet',
          },
          {
            system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
            code: '1092378',
            display: 'Tylenol PM Extra Strength 25 mg-500 mg tablet',
          },
        ],
        text: 'Tylenol PM Extra Strength 25 mg-500 mg tablet',
      },
    });

    expect(result.success).toBe(true);
  });
});
