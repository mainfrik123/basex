import type { DocType } from '@bc/auth/domain/value-objects/Document';

export type StartLoginRequestDto = { type: DocType; number: string };
export type StartLoginResponseDto = {
  userId: string;
  next: 'PASSWORD' | 'OTP' | 'BIOMETRIC' | 'DONE';
  tempToken?: string;
  user?: { id: string; email?: string; name?: string; token: string };
};

export type PasswordLoginRequestDto = StartLoginRequestDto & { password: string };
export type PasswordLoginResponseDto = { id: string; email?: string; name?: string; token: string };
