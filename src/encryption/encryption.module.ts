import { Module } from '@nestjs/common';
import { EncryptionController } from './encryption.controller';
import { EncryptionService } from './encryption.service';
import { ENCRYPTOR } from './encryptor';
import { Base64Encryptor } from './base64.encryptor';

@Module({
  controllers: [EncryptionController],
  providers: [
    EncryptionService,
    { provide: ENCRYPTOR, useClass: Base64Encryptor },
  ],
})
export class EncryptionModule {}
