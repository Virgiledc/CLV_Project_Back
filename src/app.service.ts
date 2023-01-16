import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'add /api to the end of the url to get to swagger';
  }
}
