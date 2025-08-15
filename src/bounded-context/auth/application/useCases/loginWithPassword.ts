import type { AuthRepository, PasswordLoginPayload } from '@bc/auth/domain/AuthRepository';
import type { User } from '@bc/auth/domain/entities/User';

export const loginWithPassword =
  (repo: AuthRepository) =>
  async (payload: PasswordLoginPayload): Promise<User> =>
    repo.loginWithPassword(payload);
