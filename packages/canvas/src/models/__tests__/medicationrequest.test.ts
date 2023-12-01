import { MedicationRequestSchema } from '..';

describe('MedicationRequest', () => {
  it('can parse the example', () => {
    const result = MedicationRequestSchema.safeParse({
      resourceType: 'MedicationRequest',
      id: '3423a69c-618d-4cbe-861a-54c60f48744e',
      status: 'active',
      intent: 'order',
      reportedBoolean: false,
      medicationCodeableConcept: {
        coding: [
          {
            system: 'http://www.fdbhealth.com/',
            code: '244899',
            display: 'lisinopril 10 mg tablet',
          },
          {
            system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
            code: '314076',
            display: 'lisinopril 10 mg tablet',
          },
        ],
      },
      subject: {
        reference: 'Patient/6cb2a409334943c2b48f1686dc739f11',
        type: 'Patient',
      },
      encounter: {
        reference: 'Encounter/bdadce18-098b-40dc-8bdd-ef8481bd999a',
        type: 'Encounter',
      },
      authoredOn: '2023-09-21T18:19:36.106449+00:00',
      requester: {
        reference: 'Practitioner/6c20b7152cf7421791c5ab4113060b3f',
        type: 'Practitioner',
      },
      reasonCode: [
        {
          coding: [
            {
              system: 'http://hl7.org/fhir/sid/icd-10-cm',
              code: 'I10',
              display: 'Essential (primary) hypertension',
            },
          ],
        },
      ],
      dosageInstruction: [
        {
          text: 'take 1 daily',
          doseAndRate: [
            {
              doseQuantity: {
                unit: 'Tablet',
              },
            },
          ],
        },
      ],
      dispenseRequest: {
        numberOfRepeatsAllowed: 3,
        quantity: {
          value: 30.0,
        },
        expectedSupplyDuration: {
          value: 30,
          unit: 'days',
        },
        performer: {
          display:
            'Name: CVS Health #68534|NCPDP ID: 0068534|Address: 1 Cvs Dr, Woonsocket, RI, 028956146|Phone: 4017702500|Fax: 4017704486',
        },
      },
      substitution: {
        allowedBoolean: true,
      },
    });

    expect(result.success).toBe(true);
  });
});
