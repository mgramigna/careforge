import { DocumentReferenceSchema } from '..';

describe('DocumentReference', () => {
  it('can parse the example', () => {
    const result = DocumentReferenceSchema.safeParse({
      resourceType: 'DocumentReference',
      id: '6f60ed1c-a6b3-4791-99f0-f618704e33d1',
      status: 'current',
      type: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '94093-2',
            display: 'Itemized bill',
          },
        ],
      },
      category: [
        {
          coding: [
            {
              code: 'invoicefull',
            },
          ],
        },
      ],
      subject: {
        reference: 'Patient/f3d750f5d77d403c96baef6a6055c6e7',
        type: 'Patient',
      },
      date: '2021-10-27T00:00:00+00:00',
      author: [
        {
          reference: 'Practitioner/4150cd20de8a470aa570a852859ac87e',
          type: 'Practitioner',
        },
      ],
      custodian: {
        reference: 'Organization/00000000-0000-0000-0002-000000000000',
        type: 'Organization',
      },
      content: [
        {
          attachment: {
            contentType: 'application/pdf',
            url: 'https://canvas-client-media.s3.amazonaws.com/training/invoices/f3d750f5d77d403c96baef6a6055c6e7_20211027_193132.pdf?AWSAccessKeyId=xxxx&Signature=xxxx&Expires=xxxx',
          },
          format: {
            system: 'http://ihe.net/fhir/ValueSet/IHE.FormatCode.codesystem',
            code: 'urn:ihe:iti:xds:2017:mimeTypeSufficient',
            display: 'mimeType Sufficient',
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
