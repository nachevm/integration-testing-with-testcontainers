import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Jedi, JediSchema } from "./jedi.schema";
import { JediService } from "./jedi.service";
import { JediController } from "./jedi.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Jedi.name, schema: JediSchema }])],
  providers: [JediService],
  controllers: [JediController],
})
export class JediModule {}
