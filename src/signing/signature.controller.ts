import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { SignatureService } from './signature.service';
import type { JsonObject } from '../common/types';

@Controller()
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Post('sign')
  sign(@Body() payload: JsonObject) {
    return { signature: this.signatureService.sign(payload) };
  }

  @Post('verify')
  @HttpCode(204)
  verify(@Body() body: { signature: string; data: JsonObject }) {
    if (!this.signatureService.verify(body.data, body.signature)) {
      throw new BadRequestException('Invalid signature');
    }
  }
}
