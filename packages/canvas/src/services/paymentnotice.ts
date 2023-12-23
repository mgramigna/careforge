import { err } from 'neverthrow';

import {
  PaymentNoticeBundleSchema,
  PaymentNoticeSchema,
  PaymentNoticeSearchArgsSchema,
  type PaymentNotice,
  type PaymentNoticeBundle,
  type PaymentNoticeSearchArgs,
} from '../models';
import { type Service } from '../types/service';
import { makeFhirCreateRequest, makeFhirGetRequest } from '../utils/fetch';

export type PaymentNoticeServiceType = Service<
  PaymentNotice,
  PaymentNoticeSearchArgs,
  PaymentNoticeBundle,
  PaymentNotice,
  never
>;

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

  const update: PaymentNoticeServiceType['update'] = () => {
    return Promise.resolve(err({ errorType: 'UNSUPPORTED' }));
  };

  const search: PaymentNoticeServiceType['search'] = async ({ accessToken, args }) => {
    const parsedArgs = PaymentNoticeSearchArgsSchema.parse(args);
    const response = await makeFhirGetRequest(PaymentNoticeBundleSchema, {
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
