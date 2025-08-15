import type { User } from './entities/User';
import type { DocumentId } from './value-objects/Document';

export type PreloginResult = {
  userId: string;
  loginConBiometria: boolean;
};

export type PasswordLoginPayload = DocumentId & { password: string };

export interface AuthRepository {
  /** 1) Pre-login con documento: trae flags como loginConBiometria */
  prelogin(payload: DocumentId): Promise<PreloginResult>;

  /** 2) Login definitivo con contraseña */
  loginWithPassword(payload: PasswordLoginPayload): Promise<User>;

  logout(): Promise<void>;
}
