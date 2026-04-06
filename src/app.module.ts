import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { DatabaseModule } from './shared/database/typeorm.module';
import { UsersModule } from './modules/users/users.module';


@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/', // opcional
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
