export interface Signer {
  sign(payload: unknown): string;
  verify(payload: unknown, signature: string): boolean;
}

export const SIGNER = Symbol('SIGNER');
