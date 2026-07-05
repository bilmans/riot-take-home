import { createHmac, timingSafeEqual } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Signer } from './signer';
import { canonicalize } from './canonicalize';

@Injectable()
export class HmacSigner implements Signer {
  private readonly secret = process.env.HMAC_SECRET ?? 'dev-secret-change-me';

  sign(payload: unknown): string {
    return createHmac('sha256', this.secret)
      .update(canonicalize(payload))
      .digest('hex');
  }

  verify(payload: unknown, signature: string): boolean {
    if (typeof signature !== 'string') return false;
    const expected = Buffer.from(this.sign(payload));
    const provided = Buffer.from(signature);
    return (
      expected.length === provided.length &&
      timingSafeEqual(expected, provided)
    );
  }
}
