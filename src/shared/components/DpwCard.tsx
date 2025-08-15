import React from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

type Props = {
  title?: string;
  children: React.ReactNode;
  logo?: any; // require(...)
};

export default function DpwCard({ title, children, logo }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Surface style={styles.card} elevation={1}>
          {logo && <Image source={logo} style={styles.logo} resizeMode="contain" />}
          {title && (
            <Text variant="headlineLarge" style={styles.title}>
              {title}
            </Text>
          )}
          {children}
        </Surface>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    gap: 14,
  },
  logo: { width: 90, height: 90, alignSelf: 'center', marginBottom: 6 },
  title: { textAlign: 'center', fontWeight: '700', marginBottom: 4 },
});
