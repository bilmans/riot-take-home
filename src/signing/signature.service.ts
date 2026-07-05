import { Inject, Injectable } from '@nestjs/common';
import { SIGNER } from './signer';
import type { Signer } from './signer';
import type { JsonObject } from '../common/types';

@Injectable()
export class SignatureService {
  constructor(@Inject(SIGNER) private readonly signer: Signer) {}

  sign(payload: JsonObject): string {
    return this.signer.sign(payload);
  }

  verify(payload: JsonObject, signature: string): boolean {
    return this.signer.verify(payload, signature);
  }
}
