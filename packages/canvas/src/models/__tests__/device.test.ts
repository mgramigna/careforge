import { DeviceSchema } from '..';

describe('Device', () => {
  it('can parse the example', () => {
    const result = DeviceSchema.safeParse({
      resourceType: 'Device',
      id: 'c6bf6efc-1fe1-4221-9821-e60acb53becc',
      udiCarrier: [
        {
          deviceIdentifier: '08717648200274',
          carrierHRF:
            '=/08717648200274=,000025=A99971312345600=>014032=}013032&,1000000000000XYZ123',
        },
      ],
      status: 'active',
      distinctIdentifier: 'A99971312345600',
      manufacturer: 'ACME Biomedical',
      manufactureDate: '2021-02-15',
      expirationDate: '2021-09-15',
      lotNumber: '234234',
      serialNumber: '13213123123123',
      modelNumber: '1.0',
      type: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '2478003',
            display: 'Ocular prosthesis',
          },
        ],
      },
      patient: {
        reference: 'Patient/b8dfa97bdcdf4754bcd8197ca78ef0f0',
        type: 'Patient',
      },
    });

    expect(result.success).toBe(true);
  });
});
