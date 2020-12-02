import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { ValidateInputPipe } from "./pipes/validate.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(configService.get("APP_PORT"));
}

bootstrap();
