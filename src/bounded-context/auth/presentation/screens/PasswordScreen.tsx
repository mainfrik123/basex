import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import AuthCardDpwCard from '@shared/components/DpwCard';
import TextField from '@shared/components/TextField';
import PrimaryButton from '@shared/components/PrimaryButton';

import { useAuthFlowStore } from '@store/authFlowStore';
import { useAuthStore } from '@store/authStore';
import { HttpAuthRepository } from '@bc/auth/infrastructure/implementations/HttpAuthRepository';
import { loginWithPassword } from '@bc/auth/application/useCases/loginWithPassword';

const repo = new HttpAuthRepository();
const doPasswordLogin = loginWithPassword(repo);
const DPWORLD_LOGO = require('../../../../../assets/images/dpworld-logo.png');

export default function PasswordScreen() {
  const router = useRouter();
  const flow = useAuthFlowStore();
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>();

  const onSubmit = async () => {
    if (!flow.docType || !flow.docNumber) return;

    setLoading(true);
    setErr(undefined);
    try {
      const user = await doPasswordLogin({ type: flow.docType, number: flow.docNumber, password });
      setCurrentUser(user);
      flow.reset();
      router.replace('/(private)/home');
    } catch (e: any) {
      setErr(e?.message ?? 'Erro ao entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCardDpwCard title="DP WORLD" logo={DPWORLD_LOGO}>
      <Text style={{ marginBottom: 8 }}>Senha</Text>
      <TextField
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        helperText={err}
        error={!!err}
      />
      <PrimaryButton onPress={onSubmit} loading={loading} disabled={!password}>
        Continuar
      </PrimaryButton>
    </AuthCardDpwCard>
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: 'transparent' },
});
