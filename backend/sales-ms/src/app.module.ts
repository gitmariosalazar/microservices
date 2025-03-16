import { Module } from '@nestjs/common';
import { HomeModule } from './app/module/app.module';
import { SellingModuleUsingPrisma } from './modules/sales/infrastructure/module/selling.module';

@Module({
  imports: [HomeModule, SellingModuleUsingPrisma],
  providers: [
  ],
})
export class AppModule {}
