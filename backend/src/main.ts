import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<string>('BACKEND_PORT');

  await app.listen(port, () => {
    console.log(`Server has ben started in port: ${port}`);
  });
}
bootstrap();
