import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("file/:folder/:img")
  getFile(@Param('img') img,@Param('folder') folder): StreamableFile {
    const file = createReadStream(join(process.cwd(), './upload/'+folder+'/'+img));
    return new StreamableFile(file);
  }
}
