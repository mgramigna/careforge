import { QuestionnaireSchema } from '..';

describe('Questionnaire', () => {
  it('can parse the example', () => {
    const result = QuestionnaireSchema.safeParse({
      resourceType: 'Questionnaire',
      id: '47a408d7-9f1d-4cfd-97c7-aa810df9ed39',
      name: 'Exercise',
      status: 'active',
      description: 'No Description Provided',
      code: [
        {
          system: 'http://snomed.info/sct',
          code: '404684003',
        },
      ],
      item: [
        {
          linkId: 'd82e29db-0cac-4b97-a5aa-9e81749686e2',
          code: [
            {
              system: 'http://snomed.info/sct',
              code: '228448000',
            },
          ],
          text: 'Do you exercise on a regular basis?',
          type: 'choice',
          repeats: false,
          answerOption: [
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: 'LA33-6',
                display: 'Yes',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: 'LA32-8',
                display: 'No',
              },
            },
          ],
        },
        {
          linkId: 'f2419de1-a208-4a3f-9d55-ba9bd5ed4ec2',
          code: [
            {
              system: 'http://snomed.info/sct',
              code: '228449008',
            },
          ],
          text: 'In an average week, how many days do you exercise?',
          type: 'choice',
          repeats: false,
          answerOption: [
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '228449008-0',
                display: '0',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '38112003',
                display: '1',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '19338005',
                display: '2',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '79605009',
                display: '3',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '9362000',
                display: '4',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '34001005',
                display: '5',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '68244004',
                display: '6',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '65607009',
                display: '7',
              },
            },
          ],
        },
        {
          linkId: '93137723-295f-4b28-9f97-fb58825b2cda',
          code: [
            {
              system: 'http://snomed.info/sct',
              code: '255257008',
            },
          ],
          text: 'On the days when you exercised, for how long did you exercise?',
          type: 'choice',
          repeats: false,
          answerOption: [
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: 'QUES_FINACIAL_STRESS_CODE_Q3_A1',
                display: '10-20 min',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: 'QUES_FINACIAL_STRESS_CODE_Q3_A2',
                display: '20-40 min',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: 'QUES_FINACIAL_STRESS_CODE_Q3_A3',
                display: '40-60 min',
              },
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: 'QUES_FINACIAL_STRESS_CODE_Q3_A4',
                display: '> 1 hr',
              },
            },
          ],
        },
        {
          linkId: '7eb053cd-cb2d-435f-8f55-f154645b55c4',
          code: [
            {
              system: 'http://snomed.info/sct',
              code: 'QUES_FINACIAL_STRESS_CODE_Q4',
            },
          ],
          text: 'What type of exercise do you do?',
          type: 'text',
          repeats: false,
          answerOption: [
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: 'QUES_FINACIAL_STRESS_CODE_Q4_A1',
                display: 'What type of exercise do you do?',
              },
            },
          ],
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
