import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EncryptionService } from './encryption/encryption.service';
import { ENCRYPTOR } from './encryption/encryptor';
import { Base64Encryptor } from './encryption/base64.encryptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    EncryptionService,
    { provide: ENCRYPTOR, useClass: Base64Encryptor },
  ],
})
export class AppModule {}
