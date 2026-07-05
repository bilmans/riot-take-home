import { Inject, Injectable } from '@nestjs/common';
import { SIGNER } from './signer';
import type { Signer } from './signer';

@Injectable()
export class SignatureService {
  constructor(@Inject(SIGNER) private readonly signer: Signer) {}

  sign(payload: Record<string, unknown>): string {
    return this.signer.sign(payload);
  }
}
