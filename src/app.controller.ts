import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EncryptionService } from './encryption/encryption.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly encryptionService: EncryptionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('encrypt')
  encrypt(@Body() payload: Record<string, unknown>) {
    return this.encryptionService.encrypt(payload);
  }

  @Post('decrypt')
  decrypt(@Body() payload: Record<string, unknown>) {
    return this.encryptionService.decrypt(payload);
  }
}
