import {
  BundleSchema,
  PaymentNoticeSchema,
  PaymentNoticeSearchArgs,
  PaymentNoticeSearchArgsSchema,
  type PaymentNotice,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest, makeFhirUpdateRequest } from '../utils/fetch';

export type PaymentNoticeServiceType = Service<PaymentNotice, PaymentNoticeSearchArgs>;

export const PaymentNoticeService = ({
  baseUrl,
}: {
  baseUrl: string;
}): PaymentNoticeServiceType => {
  const read: PaymentNoticeServiceType['read'] = async ({ id, accessToken }) => {
    const response = await makeFhirGetRequest(PaymentNoticeSchema, {
      path: `${baseUrl}/PaymentNotice/${id}`,
      token: accessToken,
    });

    return response;
  };

  const create: PaymentNoticeServiceType['create'] = async ({ resource, accessToken }) => {
    const response = await makeFhirCreateRequest({
      path: `${baseUrl}/PaymentNotice`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const update: PaymentNoticeServiceType['update'] = async ({ resource, accessToken }) => {
    const response = await makeFhirUpdateRequest({
      path: `${baseUrl}/PaymentNotice/${resource.id}`,
      token: accessToken,
      body: resource,
    });

    return response;
  };

  const search: PaymentNoticeServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = PaymentNoticeSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(BundleSchema(PaymentNoticeSchema), {
      path: `${baseUrl}/PaymentNotice`,
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
