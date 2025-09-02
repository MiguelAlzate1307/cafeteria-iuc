import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BcryptService } from './providers/bcrypt.service';
import { HashingService } from './providers/hashing.service';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
  ],
  providers: [BcryptService, HashingService],
})
export class AppModule {}
