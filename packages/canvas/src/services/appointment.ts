import {
  AppointmentBundleSchema,
  AppointmentSchema,
  AppointmentSearchArgsSchema,
  type Appointment,
  type AppointmentBundle,
  type AppointmentSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type AppointmentServiceType = Service<
  Appointment,
  AppointmentSearchArgs,
  AppointmentBundle,
  Appointment,
  Appointment
>;

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

  const update: AppointmentServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/Appointment/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: AppointmentServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = AppointmentSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(AppointmentBundleSchema, {
      path: `${baseUrl}/Appointment`,
      token: accessToken,
      query: new URLSearchParams(parsedArgs as Record<string, string>).toString(),
    });

    return response;
  };

  return {
    read,
    create,
    update,
    search,
  };
};
