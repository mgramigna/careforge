import { useMemo } from 'react';
import { Link } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import { ScreenView } from '@/components/molecules/ScreenView';
import { useAuth } from '@/context/AuthContext';
import { getPractitionerFromCareTeam } from '@/fhirpath/careteam';
import { getPractitionerIdFromSchedule } from '@/fhirpath/schedule';
import { api } from '@/utils/api';

const Appointments = () => {
  const { patientId } = useAuth();

  const { data: patientCareteam } = api.careteam.search.useQuery(
    {
      patient: patientId!,
    },
    {
      enabled: !!patientId,
    },
  );

  const practitionerId = useMemo(() => {
    if (patientCareteam?.entry?.at(0)?.resource) {
      return getPractitionerFromCareTeam(patientCareteam.entry.at(0)!.resource);
    }

    return null;
  }, [patientCareteam]);

  const { data: scheduleSearchResult } = api.schedule.search.useQuery();

  const scheduleId = useMemo(() => {
    const matchingSchedule = scheduleSearchResult?.entry?.find(
      ({ resource }) => getPractitionerIdFromSchedule(resource) === practitionerId,
    )?.resource;

    return matchingSchedule?.id;
  }, [practitionerId, scheduleSearchResult]);

  const { data: _slots } = api.slot.search.useQuery(
    {
      schedule: scheduleId!,
    },
    {
      enabled: !!scheduleId,
    },
  );

  return patientId ? (
    <ScreenView>
      <Link href="/appointments/sub" asChild>
        <Button text="Schedule Appointment" className="mt-4" />
      </Link>
    </ScreenView>
  ) : null;
};

export default Appointments;
