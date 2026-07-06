import { Body, Controller, Post } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import type { JsonObject } from '../common/types';

@Controller()
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('encrypt')
  encrypt(@Body() payload: JsonObject) {
    return this.encryptionService.encrypt(payload);
  }

  @Post('decrypt')
  decrypt(@Body() payload: JsonObject) {
    return this.encryptionService.decrypt(payload);
  }
}
