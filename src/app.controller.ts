import { Body, Controller, Post } from '@nestjs/common';
import { EncryptionService } from './encryption/encryption.service';
import { SignatureService } from './signing/signature.service';

@Controller()
export class AppController {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly signatureService: SignatureService,
  ) {}

  @Post('encrypt')
  encrypt(@Body() payload: Record<string, unknown>) {
    return this.encryptionService.encrypt(payload);
  }

  @Post('decrypt')
  decrypt(@Body() payload: Record<string, unknown>) {
    return this.encryptionService.decrypt(payload);
  }

  @Post('sign')
  sign(@Body() payload: Record<string, unknown>) {
    return { signature: this.signatureService.sign(payload) };
  }
}
