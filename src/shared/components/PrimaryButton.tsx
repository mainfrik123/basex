import React from 'react';
import { Button } from 'react-native-paper';

type Props = React.ComponentProps<typeof Button>;

export default function PrimaryButton(props: Props) {
  return (
    <Button
      mode="contained"
      contentStyle={{ height: 48 }}
      style={{ borderRadius: 24 }}
      {...props}
    />
  );
}
