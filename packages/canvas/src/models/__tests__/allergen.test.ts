import { AllergenSchema } from '..';

describe('Allergen', () => {
  it('can parse the example', () => {
    const result = AllergenSchema.safeParse({
      resourceType: 'Allergen',
      id: 'fdb-6-2754',
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml"><p>minocycline HCl</p><p>6979</p>"</div>',
      },
      code: {
        coding: [
          {
            system: 'http://www.fdbhealth.com/',
            code: '6-2754',
            display: 'minocycline HCl',
          },
          {
            system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
            code: '6979',
          },
        ],
      },
    });

    expect(result.success).toBe(true);
  });
});
