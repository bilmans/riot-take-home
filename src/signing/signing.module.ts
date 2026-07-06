import { Module } from '@nestjs/common';
import { SignatureController } from './signature.controller';
import { SignatureService } from './signature.service';
import { SIGNER } from './signer';
import { HmacSigner } from './hmac.signer';

@Module({
  controllers: [SignatureController],
  providers: [SignatureService, { provide: SIGNER, useClass: HmacSigner }],
})
export class SigningModule {}
