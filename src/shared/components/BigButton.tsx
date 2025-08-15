import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

type BigButtonProps = {
  title: string;
  variant?: 'blue' | 'white';
  onPress: () => void;
  iconName?: keyof typeof MaterialIcons.glyphMap;
};

export default function BigButton({ title, variant = 'blue', onPress, iconName }: BigButtonProps) {
  const isBlue = variant === 'blue';
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.wrapper,
        isBlue ? styles.blueWrapper : styles.whiteWrapper,
        isPressed && { transform: [{ scale: 0.98 }] }, // efecto de presión
      ]}
    >
      {/* Fondo dinámico para azul */}
      {isBlue && (
        <LinearGradient
          colors={isPressed ? ['#818CF8', '#4F46E5'] : ['#6366F1', '#312E81']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      )}

      {/* Fondo dinámico para blanco */}
      {!isBlue && (
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: isPressed ? '#f0f0f0' : '#fff' }]}
        />
      )}

      <View style={styles.content}>
        <Text
          style={[
            styles.label,
            isBlue ? styles.whiteText : styles.blackText,
            !iconName && styles.centerText,
          ]}
        >
          {title}
        </Text>
        {iconName && (
          <MaterialIcons
            name={iconName}
            size={22}
            color={isBlue ? '#fff' : '#000'}
            style={styles.icon}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 260,
    height: 55,
    borderRadius: 50,
    overflow: 'hidden',
    marginVertical: 10,
  },
  blueWrapper: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  whiteWrapper: {
    borderWidth: 1,
    borderColor: '#000',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 20,
  },
  icon: {
    marginLeft: 'auto', // Ícono a la derecha
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  centerText: {
    textAlign: 'center',
    width: '100%',
  },
  whiteText: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
});
