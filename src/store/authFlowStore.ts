import { create } from 'zustand';
import type { DocType } from '@bc/auth/domain/value-objects/Document';

type AuthFlowState = {
  docType?: DocType;
  docNumber?: string;
  userId?: string;
  loginConBiometria?: boolean;
  set: (p: Partial<AuthFlowState>) => void;
  reset: () => void;
};

export const useAuthFlowStore = create<AuthFlowState>((set) => ({
  docType: undefined,
  docNumber: undefined,
  userId: undefined,
  loginConBiometria: undefined,
  set: (p) => set(p),
  reset: () =>
    set({
      docType: undefined,
      docNumber: undefined,
      userId: undefined,
      loginConBiometria: undefined,
    }),
}));
