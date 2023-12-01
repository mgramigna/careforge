import { DiagnosticReportSchema } from '..';

describe('DiagnosticReport', () => {
  it('can parse the example', () => {
    const result = DiagnosticReportSchema.safeParse({
      resourceType: 'DiagnosticReport',
      id: '9b90621b-059f-4f6e-9ef5-58171098e424',
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LP29684-5',
              display: 'Radiology',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://www.ama-assn.org/go/cpt',
            code: '73562',
            display: 'XRAY, knee; 3 views',
          },
        ],
      },
      subject: {
        reference: 'Patient/a1197fa9e65b4a5195af15e0234f61c2',
        type: 'Patient',
      },
      encounter: {
        reference: 'Encounter/6a077e6f-ead2-4af7-803d-0a203bedfb1c',
        type: 'Encounter',
      },
      effectiveDateTime: '2023-08-22',
      issued: '2023-08-22T21:35:01.909441+00:00',
      performer: [
        {
          reference: 'Practitioner/883f7147517e444fb746cdac3860b0dc',
          type: 'Practitioner',
        },
      ],
      presentedForm: [
        {
          url: 'https://canvas-client-media.s3.amazonaws.com/instance/Imaging_Report.pdf?AWSAccessKeyId=xxxx&Signature=xxxx&Expires=1675179226',
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
