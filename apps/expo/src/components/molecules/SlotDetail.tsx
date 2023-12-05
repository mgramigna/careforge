import { View } from 'react-native';
import dayjs from 'dayjs';

import { type Slot } from '@canvas-challenge/canvas';

import { Button } from '../atoms/Button';

export const SlotDetail = ({ slot }: { slot: Slot }) => {
  return (
    <View className="">
      <Button
        className="w-full"
        text={`${dayjs(slot.start).format('hh:mm ')} - ${dayjs(slot.end).format('hh:mm a')}`}
      />
    </View>
  );
};
