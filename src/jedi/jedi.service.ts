import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Jedi, JediDocument } from "./jedi.schema";

@Injectable()
export class JediService {
  constructor(@InjectModel(Jedi.name) private readonly jediModel: Model<JediDocument>) {
  }

  async findAll(): Promise<JediDocument[]> {
    // await this.jediModel.create({ name: "Luke" });
    return this.jediModel.find();
  }

  async delete(id: string) {
    const jedi = await this.jediModel.findByIdAndDelete(id);
    if (!jedi) throw new NotFoundException(`No jedi found for id: ${id}`);
  }
}
