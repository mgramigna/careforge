import { CarePlanSchema } from '..';

describe('CarePlan', () => {
  it('can parse the example', () => {
    const result = CarePlanSchema.safeParse({
      resourceType: 'CarePlan',
      id: 'b4190e86-1a63-4010-85fe-5c42b607d2f9',
      text: {
        status: 'generated',
        div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div class=\"hapiHeaderText\">CarePlan</div><table class=\"hapiPropertyTable\"><tbody><tr><td>Coding</td><td>{'system': 'http://snomed.info/sct', 'code': '734163000', 'display': 'Care plan'}</td></tr><tr><td>For Patient Name</td><td><span>Cube, Rubik N. (Nick Name)</span></td></tr></tbody></table></div>",
      },
      status: 'active',
      intent: 'plan',
      category: [
        {
          coding: [
            {
              system: 'http://hl7.org/fhir/us/core/CodeSystem/careplan-category',
              code: 'assess-plan',
            },
          ],
        },
        {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '734163000',
              display: 'Care plan',
            },
          ],
        },
      ],
      subject: {
        reference: 'Patient/a1197fa9e65b4a5195af15e0234f61c2',
        type: 'Patient',
      },
    });

    expect(result.success).toBe(true);
  });
});
