import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DOC_TAGS } from './common/contants/doc-tags.constants';

@ApiTags(DOC_TAGS.APPLICATION)
@Controller()
export class AppController {
  @Get('health-check')
  healthCheck(): string {
    return 'ok';
  }
}
