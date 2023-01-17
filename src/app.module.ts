import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.i6q5hpc.mongodb.net/clv?retryWrites=true&w=majority'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
