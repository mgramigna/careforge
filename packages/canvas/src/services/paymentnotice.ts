import { PaymentNoticeSchema, type PaymentNotice } from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type PaymentNoticeServiceType = Service<PaymentNotice>;

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

  return {
    read,
    create,
  };
};
