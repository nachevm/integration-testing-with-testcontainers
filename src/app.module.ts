import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JediModule } from "./jedi/jedi.module";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [() => ({ dbUri: process.env.DB_URI })] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({ uri: configService.get<string>("dbUri") }),
    }),
    JediModule,
  ],
})
export class AppModule {}
