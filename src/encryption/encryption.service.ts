import { Inject, Injectable } from '@nestjs/common';
import { ENCRYPTOR } from './encryptor';
import type { Encryptor } from './encryptor';

@Injectable()
export class EncryptionService {
  constructor(@Inject(ENCRYPTOR) private readonly encryptor: Encryptor) {}

  encrypt(payload: Record<string, unknown>): Record<string, string> {
    return Object.fromEntries(
      Object.entries(payload).map(([key, value]) => [
        key,
        this.encryptor.encrypt(value),
      ]),
    );
  }
}
