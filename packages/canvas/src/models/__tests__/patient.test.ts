import { PatientSchema } from '..';

describe('Patient', () => {
  it('can parse the example', () => {
    const result = PatientSchema.safeParse({
      resourceType: 'Patient',
      id: '7162fd82487e4dc8aa2581ddbca91892',
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml"><div class="hapiHeaderText">Samantha<b>Jones</b></div><table class="hapiPropertyTable"><tbody><tr><td>Identifier</td><td>963277285</td></tr><tr><td>Date of birth</td><td><span>1980-11-13</span></td></tr></tbody></table></div>',
      },
      extension: [
        {
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex',
          valueCode: 'F',
        },
        {
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-genderIdentity',
          valueCodeableConcept: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '446141000124107',
                display: 'Identifies as female gender (finding)',
              },
            ],
            text: 'Identifies as female gender (finding)',
          },
        },
        {
          url: 'http://schemas.canvasmedical.com/fhir/extensions/sexual-orientation',
          valueCode: '20430005',
        },
        {
          extension: [
            {
              url: 'ombCategory',
              valueCoding: {
                system: 'urn:oid:2.16.840.1.113883.6.238',
                code: '2131-1',
                display: 'Other Race',
              },
            },
            {
              url: 'text',
              valueString: 'Other Race',
            },
          ],
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race',
        },
        {
          extension: [
            {
              url: 'ombCategory',
              valueCoding: {
                system: 'urn:oid:2.16.840.1.113883.6.238',
                code: '2186-5',
                display: 'Not Hispanic or Latino',
              },
            },
            {
              url: 'text',
              valueString: 'Not Hispanic or Latino',
            },
          ],
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity',
        },
        {
          url: 'http://hl7.org/fhir/StructureDefinition/tz-code',
          valueCode: 'America/New_York',
        },
        {
          url: 'http://schemas.canvasmedical.com/fhir/extensions/clinical-note',
          valueString: 'I am a clinical caption from a Create message',
        },
        {
          url: 'http://schemas.canvasmedical.com/fhir/extensions/administrative-note',
          valueString: 'I am an administrative caption from a Create message',
        },
        {
          extension: [
            {
              url: 'ncpdp-id',
              valueIdentifier: {
                system: 'http://terminology.hl7.org/CodeSystem/NCPDPProviderIdentificationNumber',
                value: '1123152',
              },
            },
            {
              url: 'specialty_type',
              valueString: 'Retail',
            },
            {
              url: 'default',
              valueBoolean: false,
            },
          ],
          url: 'http://schemas.canvasmedical.com/fhir/extensions/preferred-pharmacy',
        },
      ],
      identifier: [
        {
          use: 'usual',
          type: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                code: 'MR',
              },
            ],
          },
          system: 'http://canvasmedical.com',
          value: '963277285',
          assigner: {
            display: 'Canvas Medical',
          },
        },
        {
          id: '1e628d77-5cdd-400f-a239-b24929d4a0aa',
          use: 'usual',
          system: 'HealthCo',
          value: 's07960990',
          period: {
            start: '1970-01-01',
            end: '2100-12-31',
          },
        },
      ],
      active: true,
      name: [
        {
          use: 'official',
          family: 'Jones',
          given: ['Samantha', 'Ann'],
          period: {
            start: '0001-01-01T00:00:00+00:00',
            end: '9999-12-31T23:59:59.999999+00:00',
          },
        },
        {
          use: 'nickname',
          given: ['Sammy'],
          period: {
            start: '0001-01-01T00:00:00+00:00',
            end: '9999-12-31T23:59:59.999999+00:00',
          },
        },
      ],
      telecom: [
        {
          id: 'aa0d6ad0-0b69-4740-9c8c-759c769a63d1',
          extension: [
            {
              url: 'http://schemas.canvasmedical.com/fhir/extensions/has-consent',
              valueBoolean: false,
            },
          ],
          system: 'phone',
          value: '5554320555',
          use: 'mobile',
          rank: 1,
        },
        {
          id: '49c0c29d-c56e-41bb-89ab-79562bb75afc',
          extension: [
            {
              url: 'http://schemas.canvasmedical.com/fhir/extensions/has-consent',
              valueBoolean: false,
            },
          ],
          system: 'email',
          value: 'samantha.jones@example.com',
          use: 'work',
          rank: 1,
        },
      ],
      gender: 'female',
      birthDate: '1980-11-13',
      deceasedBoolean: false,
      address: [
        {
          id: '611aaf01-a515-4d55-b43d-88b8735359f7',
          use: 'home',
          type: 'both',
          line: ['1234 Main St.'],
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '94107',
          country: 'United States',
        },
      ],
      photo: [
        {
          url: 'https://canvas-client-media.s3.amazonaws.com/local/patient-avatars/20230928_213831_7162fd82487e4dc8aa2581ddbca91892.unknown_image?AWSAccessKeyId=AKIAQB7SIDR7IJXXMF47&Signature=kG1YseB%2FjSd7UMErYFVst8%2B3yHY%3D&Expires=1695938081',
        },
      ],
      contact: [
        {
          id: '1ba81cb4-7f97-429d-b0d8-4c4f067b11a5',
          extension: [
            {
              url: 'http://schemas.canvasmedical.com/fhir/extensions/emergency-contact',
              valueBoolean: true,
            },
            {
              url: 'http://schemas.canvasmedical.com/fhir/extensions/authorized-for-release-of-information',
              valueBoolean: true,
            },
          ],
          relationship: [
            {
              coding: [
                {
                  system: 'http://schemas.canvasmedical.com/fhir/contact-category',
                  code: 'ARI',
                  display: 'Authorized for release of information',
                },
                {
                  system: 'http://schemas.canvasmedical.com/fhir/contact-category',
                  code: 'POA',
                  display: 'Power of attorney',
                },
                {
                  system: 'http://schemas.canvasmedical.com/fhir/contact-category',
                  code: 'EMC',
                  display: 'Emergency contact',
                },
              ],
              text: 'Spouse',
            },
          ],
          name: {
            text: 'Dan Jones',
          },
          telecom: [
            {
              system: 'email',
              value: 'danjones@example.com',
            },
          ],
        },
        {
          id: 'f259a2b0-6bae-479b-8efe-f9436046cfb3',
          extension: [
            {
              url: 'http://schemas.canvasmedical.com/fhir/extensions/emergency-contact',
              valueBoolean: false,
            },
            {
              url: 'http://schemas.canvasmedical.com/fhir/extensions/authorized-for-release-of-information',
              valueBoolean: false,
            },
          ],
          relationship: [
            {
              text: 'Mother',
            },
          ],
          name: {
            text: 'Linda Stewart',
          },
          telecom: [
            {
              system: 'phone',
              value: '5557327068',
            },
          ],
        },
        {
          id: '30639a10-18c2-4222-8d26-32b2ca36a1bb',
          extension: [
            {
              url: 'http://schemas.canvasmedical.com/fhir/extensions/emergency-contact',
              valueBoolean: false,
            },
            {
              url: 'http://schemas.canvasmedical.com/fhir/extensions/authorized-for-release-of-information',
              valueBoolean: false,
            },
          ],
          relationship: [
            {
              text: 'Father',
            },
          ],
          name: {
            text: 'Jimmy Stewart',
          },
          telecom: [
            {
              system: 'email',
              value: 'j.stewart@example.com',
            },
          ],
        },
      ],
      communication: [
        {
          language: {
            coding: [
              {
                system: 'urn:ietf:bcp:47',
                code: 'en',
                display: 'English',
              },
            ],
            text: 'English',
          },
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
