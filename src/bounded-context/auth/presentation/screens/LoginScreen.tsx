import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

import AuthCardDpwCard from '@shared/components/DpwCard';
import Dropdown, { Option } from '@shared/components/Dropdown';
import TextField from '@shared/components/TextField';
import PrimaryButton from '@shared/components/PrimaryButton';

import type { DocType } from '@bc/auth/domain/value-objects/Document';
import { useAuthFlowStore } from '@store/authFlowStore';

import { HttpAuthRepository } from '@bc/auth/infrastructure/implementations/HttpAuthRepository';
import { prelogin } from '@bc/auth/application/useCases/prelogin';

// Imagen (ruta relativa al archivo)
const DPWORLD_LOGO = require('../../../../../assets/images/dpworld-logo.png');

// Opciones tipadas (label mostrado, value real del dominio)
const DOC_OPTIONS: Option<DocType>[] = [
  { label: 'CPF', value: 'CPF' },
  { label: 'Identidade (Estrangeiro)', value: 'IDENTIDADE' },
  { label: 'Passaporte (Estrangeiro)', value: 'PASSAPORTE' },
];

// Formateo simple de CPF (###.###.###-##)
const formatCPF = (input: string): string => {
  const d = input.replace(/\D/g, '').slice(0, 11);
  const p1 = d.slice(0, 3),
    p2 = d.slice(3, 6),
    p3 = d.slice(6, 9),
    p4 = d.slice(9, 11);
  return [p1, p2 && `.${p2}`, p3 && `.${p3}`, p4 && `-${p4}`].filter(Boolean).join('');
};

const repo = new HttpAuthRepository();
const doPrelogin = prelogin(repo);

export default function LoginScreen() {
  const router = useRouter();
  const flow = useAuthFlowStore();

  // Estado del formulario
  const [docType, setDocType] = useState<DocType | null>(null);
  const [docNumber, setDocNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>();

  const placeholder = useMemo(() => (docType === 'CPF' ? '123.456.789-09' : ''), [docType]);

  const isValid =
    !!docType &&
    (docType === 'CPF' ? docNumber.replace(/\D/g, '').length === 11 : docNumber.trim().length > 2);

  const onSubmit = async () => {
    if (!docType) return;

    setLoading(true);
    setErr(undefined);
    try {
      // Guardamos en store para las pantallas siguientes
      flow.set({ docType, docNumber });

      // Para el API, envía el número “limpio” si es CPF
      const numberForApi = docType === 'CPF' ? docNumber.replace(/\D/g, '') : docNumber.trim();

      // PRELOGIN: decide siguiente paso
      const res = await doPrelogin({ type: docType, number: numberForApi });
      flow.set({ userId: res.userId, loginConBiometria: res.loginConBiometria });

      if (res.loginConBiometria) {
        router.replace('/(verify)/biometric-intro'); // pantalla de instrucciones
      } else {
        router.replace('/(public)/password'); // ir directo a “Senha”
      }
    } catch (e: any) {
      setErr(e?.message ?? 'Erro ao validar documento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCardDpwCard title="DP WORLD" logo={DPWORLD_LOGO}>
      <Dropdown<DocType>
        label="Tipo de Documento"
        placeholder="Selecionar"
        value={docType} // DocType | null
        options={DOC_OPTIONS}
        onChange={(val) => setDocType(val)}
      />

      <TextField
        label="Número do Documento"
        value={docNumber}
        onChangeText={setDocNumber}
        placeholder={placeholder}
        keyboardType={docType === 'CPF' ? 'number-pad' : 'default'}
        mask={docType === 'CPF' ? formatCPF : undefined}
        style={styles.input}
      />

      {!!err && <Text style={{ color: 'red' }}>{err}</Text>}

      <PrimaryButton
        icon="arrow-right"
        disabled={!isValid || loading}
        onPress={onSubmit}
        loading={loading}
      >
        Entrar
      </PrimaryButton>

      <Text style={styles.linkMuted}>Esqueci minha senha? Recuperar</Text>
      <Text style={styles.linkPrimary}>Ainda não tem uma conta? Cadastre-se</Text>
    </AuthCardDpwCard>
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: 'transparent' },
  linkMuted: { marginTop: 8, opacity: 0.6 },
  linkPrimary: { marginTop: 14, textDecorationLine: 'underline', textAlign: 'center' },
});
