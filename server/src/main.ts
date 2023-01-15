import { TransformInterceptor } from './ transform.interceptor';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const PORT = 3000;
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(PORT);
  logger.log(`app is listening on ${PORT} `);
}
bootstrap();
