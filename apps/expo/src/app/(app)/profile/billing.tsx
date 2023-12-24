import React, { Fragment, useCallback, useState } from 'react';
import { Alert, RefreshControl, ScrollView, View } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Text } from '@/components/atoms/Text';
import { AddEditInsuranceModal } from '@/components/molecules/AddEditInsuranceModal';
import { ScreenView } from '@/components/molecules/ScreenView';
import {
  SubmitPaymentModal,
  type PaymentFormType,
} from '@/components/molecules/SubmitPaymentModal';
import { CoverageDetail } from '@/components/organisms/CoverageDetail';
import { DocumentDownloadCard } from '@/components/organisms/DocumentDownloadCard';
import { type InsuranceFormType } from '@/components/organisms/InsuranceForm';
import { useAuth } from '@/context/AuthContext';
import { palette } from '@/theme/colors';
import { api } from '@/utils/api';
import { getCoverageResource } from '@/utils/fhir';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { type Coverage } from '@careforge/canvas';

const Billing = () => {
  const { patientId } = useAuth();
  const [insuranceModalOpen, setInsuranceModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const {
    data: invoiceBundle,
    isLoading: invoicesLoading,
    refetch: refetchInvoices,
    isRefetching: invoicesRefetching,
  } = api.documentreference.search.useQuery(
    {
      category: 'invoicefull',
      patient: patientId!,
    },
    {
      enabled: !!patientId,
    },
  );

  const {
    data: coverageBundle,
    isLoading: coverageLoading,
    refetch: refetchCoverage,
    isRefetching: coverageRefetching,
  } = api.coverage.search.useQuery(
    {
      patient: patientId!,
    },
    {
      enabled: !!patientId,
    },
  );

  const utils = api.useUtils();
  const createCoverageMutation = api.coverage.create.useMutation({
    onSuccess: async () => {
      await utils.coverage.search.invalidate();
      setInsuranceModalOpen(false);
    },
  });

  const createPaymentMutation = api.paymentnotice.create.useMutation({
    onSuccess: async () => {
      await utils.documentreference.search.invalidate({
        category: 'invoicefull',
      });
      setPaymentModalOpen(false);
    },
    onError: (error) => {
      if (error.data?.code === 'UNPROCESSABLE_CONTENT') {
        Alert.alert('Submitted amount must be less than or equal to the amount owed');
      } else {
        Alert.alert('Something went wrong');
      }
    },
  });

  const handleCoverageSave = useCallback(
    (form: InsuranceFormType) => {
      const coverage = getCoverageResource({
        ...form,
        patientId: patientId!,
      }) as Omit<Coverage, 'id'>;

      createCoverageMutation.mutate(coverage);
    },
    [createCoverageMutation, patientId],
  );

  const handlePaymentSubmit = useCallback(
    (form: PaymentFormType) => {
      createPaymentMutation.mutate({
        resourceType: 'PaymentNotice',
        status: 'active',
        request: {
          reference: `Patient/${patientId}`,
        },
        created: dayjs().toISOString(),
        payment: {},
        recipient: {},
        amount: {
          value: parseFloat(form.amount),
          currency: 'USD',
        },
      });
    },
    [createPaymentMutation, patientId],
  );

  const onRefresh = useCallback(() => {
    Promise.all([refetchInvoices(), refetchCoverage()]).catch(() =>
      Alert.alert('Error refreshing data'),
    );
  }, [refetchInvoices, refetchCoverage]);

  return patientId ? (
    <>
      <ScreenView>
        <ScrollView
          className="h-full"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={invoicesRefetching || coverageRefetching}
              onRefresh={onRefresh}
              tintColor={palette.coolGray[50]}
            />
          }
        >
          <View>
            <Text className="text-3xl" weight="bold">
              My Bills
            </Text>
          </View>
          <View className="mt-8">
            {invoicesLoading && <Skeleton className="bg-coolGray-400 h-24" />}
            {!invoicesLoading && (invoiceBundle?.total ?? 0) > 0 ? (
              <View className="flex gap-4">
                {invoiceBundle?.entry?.map(({ resource }) => (
                  <Fragment key={resource.id}>
                    <DocumentDownloadCard
                      documentReference={resource}
                      leftIcon={
                        <Ionicons size={18} color={palette.coolGray[500]} name="card-outline" />
                      }
                    />
                  </Fragment>
                ))}
              </View>
            ) : (
              <View className="flex h-24 w-full items-center justify-center">
                <Text italic>No current bills</Text>
              </View>
            )}
          </View>
          {(invoiceBundle?.total ?? 0) > 0 && (
            <View className="mt-8">
              <Button text="Pay Bills" onPress={() => setPaymentModalOpen(true)} />
            </View>
          )}
          <View className="mt-8">
            <Text className="text-3xl" weight="bold">
              My Insurance
            </Text>
          </View>
          <View className="mt-8 flex gap-4">
            {coverageLoading && <Skeleton className="bg-coolGray-200 h-52 w-full" />}
            {!coverageLoading &&
              coverageBundle?.entry
                ?.filter(({ resource }) => resource.status === 'active')
                .map(({ resource }) => (
                  <Fragment key={resource.id}>
                    <CoverageDetail coverage={resource} patientId={patientId} />
                  </Fragment>
                ))}
          </View>
          <View className="mt-8 pb-24">
            <Button text="Add New Insurance" onPress={() => setInsuranceModalOpen(true)} />
          </View>
        </ScrollView>
      </ScreenView>
      <SubmitPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSubmit={handlePaymentSubmit}
        isMutating={createPaymentMutation.isPending}
      />
      <AddEditInsuranceModal
        isOpen={insuranceModalOpen}
        onClose={() => setInsuranceModalOpen(false)}
        onSubmit={handleCoverageSave}
        isMutating={createCoverageMutation.isPending}
      />
    </>
  ) : null;
};

export default Billing;
