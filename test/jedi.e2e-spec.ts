import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { Model } from "mongoose";
import { Jedi, JediDocument } from "../src/jedi/jedi.schema";
import { GenericContainer, StartedTestContainer } from "testcontainers";
import * as process from "process";
import { getModelToken } from "@nestjs/mongoose";
import * as request from "supertest";

describe("JediController (e2e)", () => {
  let app: INestApplication;
  let container: StartedTestContainer;
  let jediModel: Model<JediDocument>;

  beforeAll(async () => {
    container = await new GenericContainer("mongo:6").withExposedPorts(27017).start();
    process.env.DB_URI = `mongodb://localhost:${container.getMappedPort(27017)}/jedi`;

    const module: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    jediModel = module.get<Model<JediDocument>>(getModelToken(Jedi.name));

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => jediModel.deleteMany());

  afterAll(async () => {
    await container.stop();
    await app.close();
  });

  it("gets all jedi", async () => {
    await jediModel.create({ name: "Anakin" });

    const { body } = await request(app.getHttpServer()).get("/jedi").expect(200);
    expect(body[0].name).toEqual("Anakin");
  });

  it("deletes a jedi by id", async () => {
    const jedi = await jediModel.create({ name: "Rey" });

    await request(app.getHttpServer()).delete(`/jedi/${jedi.id}`).expect(200);
    expect(await jediModel.find()).toEqual([]);
  });

  it("throws exception if jedi is not found when deleting", async () => {
    await request(app.getHttpServer()).get("/jedi/1").expect(404);
  });
});
