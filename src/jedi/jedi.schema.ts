import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type JediDocument = HydratedDocument<Jedi>;

@Schema()
export class Jedi {
  @Prop()
  name: string;
}

export const JediSchema = SchemaFactory.createForClass(Jedi);
