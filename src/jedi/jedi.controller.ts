import { Controller, Delete, Get, Param } from "@nestjs/common";
import { JediService } from "./jedi.service";
import { JediDocument } from "./jedi.schema";

@Controller("/jedi")
export class JediController {
  constructor(private readonly jediService: JediService) {}

  @Get()
  async findAll(): Promise<JediDocument[]> {
    return this.jediService.findAll();
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    await this.jediService.delete(id);
  }
}
