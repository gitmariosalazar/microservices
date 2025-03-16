import { Module } from '@nestjs/common';
import { HomeModule } from './app/module/app.module';
import { UserModuleUsingPrisma } from './modules/users/infrastructure/module/user.module';
import { AuthModuleUsingPrisma } from './modules/authentication/infrastructure/module/auth.module';

@Module({
  imports: [HomeModule, UserModuleUsingPrisma, AuthModuleUsingPrisma],
  providers: [
  ],
})
export class AppModule {}
