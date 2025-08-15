import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import PrimaryButton from '@shared/components/PrimaryButton';
import AuthCardDpwCard from '@shared/components/DpwCard';

const DPWORLD_LOGO = require('../../../../../assets/images/dpworld-logo.png');

export default function BiometricIntroScreen() {
  const router = useRouter();
  return (
    <AuthCardDpwCard title="Foto de Segurança" logo={DPWORLD_LOGO}>
      <Text style={styles.subtitle}>Confirme sua identidade</Text>
      <Text style={styles.item}>- Tire uma selfie como no exemplo</Text>
      <Text style={styles.item}>- A imagem não deve estar desfocada</Text>
      <Text style={styles.item}>- A imagem deve estar bem iluminada</Text>
      <Text style={styles.item}>- Não use óculos, chapéus ou acessórios</Text>

      <Text
        style={{ textDecorationLine: 'underline', marginTop: 12 }}
        onPress={() => router.replace('/(public)/password')}
      >
        Faça login usando senha
      </Text>

      <PrimaryButton style={{ marginTop: 16 }} onPress={() => router.replace('/(public)/password')}>
        Continuar
      </PrimaryButton>
    </AuthCardDpwCard>
  );
}

const styles = StyleSheet.create({
  subtitle: { fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  item: { opacity: 0.8, marginVertical: 2 },
});
