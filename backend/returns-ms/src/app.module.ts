import { Module } from '@nestjs/common';
import { HomeModule } from './app/module/app.module';
import { ReturnModuleUsingPrisma } from './modules/returns/infrastructure/module/return.module';
import { GlobalExceptionFilter } from './shared/errors/exception/GlobalExceptionHandler';

@Module({
  imports: [HomeModule, ReturnModuleUsingPrisma],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
