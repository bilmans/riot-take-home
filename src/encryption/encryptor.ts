export interface Encryptor {
  encrypt(value: unknown): string;
  decrypt(payload: string): unknown;
  isEncrypted(value: unknown): boolean;
}

export const ENCRYPTOR = Symbol('ENCRYPTOR');
