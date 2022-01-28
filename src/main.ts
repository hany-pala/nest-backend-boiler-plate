import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ValidationPipe } from './common/pipe/validation.pipe';
import helmet from 'helmet';
import cusrf from 'csurf';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  /** set global filters */
  app.useGlobalFilters(new HttpExceptionFilter());

  /** set global pipes */
  app.useGlobalPipes(new ValidationPipe());

  /** set config for security */
  app.use(helmet());
  app.use(cusrf());
  app.enableCors();
}
bootstrap();
