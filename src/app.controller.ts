import { Body, Controller, Post } from '@nestjs/common';
import { EncryptionService } from './encryption/encryption.service';

@Controller()
export class AppController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('encrypt')
  encrypt(@Body() payload: Record<string, unknown>) {
    return this.encryptionService.encrypt(payload);
  }

  @Post('decrypt')
  decrypt(@Body() payload: Record<string, unknown>) {
    return this.encryptionService.decrypt(payload);
  }
}
