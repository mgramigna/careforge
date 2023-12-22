import { Text } from '../atoms/Text';

export const InputLabel = ({ label, required }: { label: string; required?: boolean }) => {
  return (
    <Text className="mb-2 pl-1 text-xl">
      {label}
      {required && <Text className="text-red-500">*</Text>}
    </Text>
  );
};
