import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

type Props = {
  label?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  keyboardType?: React.ComponentProps<typeof TextInput>['keyboardType'];
  secureTextEntry?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  right?: React.ReactNode; // <TextInput.Icon .../>
  left?: React.ReactNode;
  style?: StyleProp<TextStyle>; // ojo: TextStyle (Paper así lo tipa)
  mask?: (raw: string) => string; // aplica formato (ej: CPF)
};

export default function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  disabled,
  error,
  helperText,
  right,
  left,
  style,
  mask,
}: Props) {
  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={(t) => onChangeText?.(mask ? mask(t) : t)}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        error={!!error}
        right={right as any}
        left={left as any}
        style={style}
      />
      {!!helperText && (
        <HelperText type={error ? 'error' : 'info'} visible>
          {helperText}
        </HelperText>
      )}
    </>
  );
}
