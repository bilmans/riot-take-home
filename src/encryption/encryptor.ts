export interface Encryptor {
  encrypt(value: unknown): string;
  decrypt(payload: string): unknown;
}

export const ENCRYPTOR = Symbol('ENCRYPTOR');
