import { api } from '@/utils/api';

export function usePractitioner(practitionerId: string) {
  const { data: practitioner, isLoading } = api.practitioner.get.useQuery({
    id: practitionerId,
  });

  return { practitioner, isLoading };
}
