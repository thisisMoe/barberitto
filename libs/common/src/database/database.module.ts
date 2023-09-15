import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  // Abstracting the initialization of the models away to other modules (ex:ReservationModule) when importing the DatabaseModule, to finally register a custom Document Schema
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
