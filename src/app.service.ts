import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {message: 'add /api to get to swagger'};
  }
}
