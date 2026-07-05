import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncryptionService } from './encryption/encryption.service';
import { ENCRYPTOR } from './encryption/encryptor';
import { Base64Encryptor } from './encryption/base64.encryptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    EncryptionService,
    { provide: ENCRYPTOR, useClass: Base64Encryptor },
  ],
})
export class AppModule {}
