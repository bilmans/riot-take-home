export interface Signer {
  sign(payload: unknown): string;
}

export const SIGNER = Symbol('SIGNER');
