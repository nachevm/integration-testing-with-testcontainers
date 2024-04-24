import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";
import { GenericContainer } from "testcontainers";

async function bootstrap() {
  let mongoContainer;
  if (!process.env.DB_URI) {
    mongoContainer = await new GenericContainer("mongo:6").withExposedPorts(27017).start();
    process.env.DB_URI = `mongodb://localhost:${mongoContainer.getMappedPort(27017)}/jedi`;
  }
  // if (!process.env.DB_URI) {
  //   await new DockerComposeEnvironment(".", "docker-compose.yaml").up();
  //   process.env.DB_URI = `mongodb://localhost:27017/jedi`;
  // }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
