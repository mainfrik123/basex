import type { DocumentId } from '@bc/auth/domain/value-objects/Document';
import type { AuthRepository, PreloginResult } from '@bc/auth/domain/AuthRepository';

export const prelogin =
  (repo: AuthRepository) =>
  async (payload: DocumentId): Promise<PreloginResult> =>
    repo.prelogin(payload);
