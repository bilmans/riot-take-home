import { Injectable } from '@nestjs/common';
import { Encryptor } from './encryptor';

@Injectable()
export class Base64Encryptor implements Encryptor {
  encrypt(value: unknown): string {
    return Buffer.from(JSON.stringify(value)).toString('base64');
  }

  decrypt(payload: string): unknown {
    return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
  }

  isEncrypted(value: unknown): boolean {
    if (typeof value !== 'string' || value.length === 0) return false;
    try {
      const decoded = Buffer.from(value, 'base64');
      if (decoded.toString('base64') !== value) return false;
      JSON.parse(decoded.toString('utf8'));
      return true;
    } catch {
      return false;
    }
  }
}
