// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import clsx from 'clsx';
import { match } from 'ts-pattern';

export interface TextProps extends RNTextProps {
  weight?: 'bold' | 'regular';
  italic?: boolean;
}

export const Text = ({
  children,
  className,
  weight = 'regular',
  italic = false,
  ...props
}: TextProps) => {
  const fontStyle = match({ weight, italic })
    .with({ weight: 'regular', italic: true }, () => 'font-open-sans-italic')
    .with({ weight: 'regular', italic: false }, () => 'font-open-sans')
    .with({ weight: 'bold', italic: true }, () => 'font-open-sans-bold-italic')
    .with({ weight: 'bold', italic: false }, () => 'font-open-sans-bold')
    .otherwise(() => '');

  return (
    <RNText {...props} className={clsx('text-coolGray-800', fontStyle, className)}>
      {children}
    </RNText>
  );
};
