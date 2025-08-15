// app/_layout.tsx
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import {
  Provider as PaperProvider,
  MD3LightTheme as PaperDefaultTheme,
  configureFonts,
} from 'react-native-paper';
import type { MD3Typescale } from 'react-native-paper/lib/typescript/types';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });
  if (!loaded) return null;

  const navigationDefaultTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#f0eff3' },
  };

  const customFonts: Partial<MD3Typescale> = {
    displayLarge: {
      fontFamily: 'PoppinsBold',
      fontWeight: 'normal',
      fontSize: 57,
      lineHeight: 64,
      letterSpacing: 0,
    },
    headlineMedium: {
      fontFamily: 'PoppinsRegular',
      fontWeight: 'normal',
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
    },
    bodyMedium: {
      fontFamily: 'PoppinsRegular',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    labelLarge: {
      fontFamily: 'PoppinsBold',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
    },
  };

  const paperTheme = {
    ...PaperDefaultTheme,
    colors: { ...PaperDefaultTheme.colors, background: '#f0eff3' },
    fonts: configureFonts({ config: customFonts }),
  };

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationDefaultTheme}>
        <View style={styles.container}>
          <Stack
            screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#f0eff3' } }}
          >
            {/* Grupos de rutas */}
            <Stack.Screen name="(public)" />
            <Stack.Screen name="(private)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0eff3' },
});
