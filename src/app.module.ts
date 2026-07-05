import { Module } from '@nestjs/common';
import { EncryptionModule } from './encryption/encryption.module';
import { SigningModule } from './signing/signing.module';

@Module({
  imports: [EncryptionModule, SigningModule],
})
export class AppModule {}
