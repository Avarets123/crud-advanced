import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync(typeormConfig()),
  ],
})
export class AppModule {}
