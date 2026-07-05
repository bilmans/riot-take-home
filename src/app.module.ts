import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EncryptionService } from './encryption/encryption.service';
import { ENCRYPTOR } from './encryption/encryptor';
import { Base64Encryptor } from './encryption/base64.encryptor';
import { SignatureService } from './signing/signature.service';
import { SIGNER } from './signing/signer';
import { HmacSigner } from './signing/hmac.signer';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    EncryptionService,
    { provide: ENCRYPTOR, useClass: Base64Encryptor },
    SignatureService,
    { provide: SIGNER, useClass: HmacSigner },
  ],
})
export class AppModule {}
