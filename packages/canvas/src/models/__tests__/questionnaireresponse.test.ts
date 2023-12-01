import { QuestionnaireResponseSchema } from '..';

describe('QuestionnaireResponse', () => {
  it('can parse the example', () => {
    const result = QuestionnaireResponseSchema.safeParse({
      resourceType: 'QuestionnaireResponse',
      id: 'e76e44b4-4e68-4f72-b1c3-1de528a3bb2a',
      extension: [
        {
          url: 'http://schemas.canvasmedical.com/fhir/extensions/questionnaire-permalink',
          valueString:
            'https://example.canvasmedical.com/permalinks/v1/YWJjZGVmZ2hpamtsbW5vcHFycwo',
        },
      ],
      questionnaire: 'Questionnaire/7eefd6fc-0000-44c2-8224-d95f0ceaa2fd',
      status: 'completed',
      subject: {
        reference: 'Patient/b8dfa97bdcdf4754bcd8197ca78ef0f0',
        type: 'Patient',
      },
      encounter: {
        reference: 'Encounter/ffa0bd44-997f-4ad4-8782-1a6c0ef01f1c',
        type: 'Encounter',
      },
      authored: '2022-12-19T18:11:20.914260+00:00',
      author: {
        reference: 'Practitioner/9cdb7a92d6614dcfa7948f2143a9f8e8',
        type: 'Practitioner',
      },
      item: [
        {
          linkId: 'e2e5ddc3-a0ec-4a1b-9c53-bf2e2e990fe1',
          text: 'Tobacco status',
          answer: [
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '8517006',
                display: 'Former user',
              },
            },
          ],
        },
        {
          linkId: 'd210dc3a-3427-4f58-8707-3f38393a8416',
          text: 'Tobacco type',
          answer: [
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '722496004',
                display: 'Cigarettes',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '722498003',
                display: 'eCigarette',
              },
            },
          ],
        },
        {
          linkId: 'a656c6c8-ecea-403f-a430-f80899f26914',
          text: 'Tobacco comment',
          answer: [
            {
              valueString: 'Yep',
            },
          ],
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
