import { Module } from '@nestjs/common';
import { HomeModule } from './app/module/app.module';
import { ReturnModuleUsingPrisma } from './modules/returns/infrastructure/module/return.module';

@Module({
  imports: [HomeModule, ReturnModuleUsingPrisma],
  providers: [
  ],
})
export class AppModule {}
