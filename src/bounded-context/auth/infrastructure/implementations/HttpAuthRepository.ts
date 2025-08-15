import type {
  AuthRepository,
  PreloginResult,
  PasswordLoginPayload,
} from '@bc/auth/domain/AuthRepository';
import type { DocumentId } from '@bc/auth/domain/value-objects/Document';
import type { User } from '@bc/auth/domain/entities/User';
// import { http } from '@core/infrastructure/http/client';
// import type { PreloginRequestDto, PreloginResponseDto, PasswordLoginRequestDto, PasswordLoginResponseDto } from '../models/AuthDtos';

export class HttpAuthRepository implements AuthRepository {
  async prelogin(payload: DocumentId): Promise<PreloginResult> {
    // TODO DP : reemplazar por API real
    // const data = await http<PreloginResponseDto>(`${BASE}/auth/prelogin`, { method:'POST', body: JSON.stringify(payload) });

    // MOCK: si es CPF → fuerza biometría; si no → pide contraseña
    const loginConBiometria = payload.type === 'CPF';
    return { userId: 'u-pre-' + payload.number.slice(-4), loginConBiometria };
  }

  async loginWithPassword(payload: PasswordLoginPayload): Promise<User> {
    // TODO DP : reemplazar por API real
    // const data = await http<PasswordLoginResponseDto>(`${BASE}/auth/login`, { ... });
    // Si quieres validar algo del mock:
    if (!payload.password || payload.password.length < 4) {
      throw new Error('Senha inválida');
    }
    return { id: 'u-' + payload.number.slice(-4), name: 'Demo', token: 'demo-token' };
  }

  async logout(): Promise<void> {}
}
