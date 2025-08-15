// src/shared/components/Dropdown.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle, // <- usamos TextStyle para el input
} from 'react-native';
import {
  Menu,
  TextInput,
  HelperText, // <- helper correcto en v5
  useTheme,
} from 'react-native-paper';

export type Option<T = string> = { label: string; value: T; disabled?: boolean };

type DropdownProps<T = string> = {
  label?: string;
  placeholder?: string;
  value?: T | null;
  options: (Option<T> | string)[];
  onChange: (val: T, option?: Option<T>) => void;

  disabled?: boolean;
  error?: boolean;
  helperText?: string;

  style?: StyleProp<ViewStyle>; // contenedor externo
  inputStyle?: StyleProp<TextStyle>; // <- TextInput espera TextStyle
};

export default function Dropdown<T = string>({
  label,
  placeholder = 'Selecionar',
  value,
  options,
  onChange,
  disabled,
  error,
  helperText,
  style,
  inputStyle,
}: DropdownProps<T>) {
  useTheme(); // si luego quieres leer theme ?
  const [open, setOpen] = useState(false);
  const [anchorWidth, setAnchorWidth] = useState(0);

  const normalized = useMemo<Option<T>[]>(
    () => options.map((o) => (typeof o === 'string' ? { label: o, value: o as unknown as T } : o)),
    [options],
  );

  const selected = useMemo(() => normalized.find((o) => o.value === value), [normalized, value]);

  return (
    <View
      onLayout={(e) => setAnchorWidth(e.nativeEvent.layout.width)}
      style={[styles.container, style]}
    >
      <Menu
        visible={open}
        onDismiss={() => setOpen(false)}
        anchorPosition="bottom"
        contentStyle={{ width: anchorWidth }} // ancho igual al input
        anchor={
          <Pressable onPress={() => !disabled && setOpen(true)} style={{ width: '100%' }}>
            {/* pointerEvents para que el press lo capture el contenedor */}
            <TextInput
              label={label}
              value={selected?.label ?? placeholder}
              right={
                <TextInput.Icon
                  icon="menu-down"
                  onPress={() => setOpen(true)}
                  forceTextInputFocus={false} // <- clave: no intentar enfocar el input
                />
              }
              editable={false}
              pointerEvents="none"
              error={!!error}
              style={[styles.input, inputStyle]}
            />
          </Pressable>
        }
      >
        {normalized.map((opt, idx) => (
          <Menu.Item
            key={`${opt.label}-${idx}`}
            title={opt.label}
            disabled={opt.disabled}
            onPress={() => {
              setOpen(false);
              onChange(opt.value, opt);
            }}
          />
        ))}
      </Menu>

      {!!helperText && (
        <HelperText type={error ? 'error' : 'info'} visible>
          {helperText}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  input: { backgroundColor: 'transparent' } as TextStyle, // opcional, ayuda a TS
});
