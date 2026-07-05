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
}
