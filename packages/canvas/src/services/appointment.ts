import { AppointmentSchema, type Appointment } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type AppointmentServiceType = Service<Appointment>;

export const AppointmentService = ({ baseUrl }: { baseUrl: string }): AppointmentServiceType => {
  const read: AppointmentServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(AppointmentSchema, {
      path: `${baseUrl}/Appointment/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: AppointmentServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/Appointment`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  return {
    read,
    create,
  };
};
