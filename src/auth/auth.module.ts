import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthController } from './admin/admin.auth.controller';
import { AdminAuthService } from './admin/admin.auth.service';
import { TeacherAuthController } from './teacher/teacher.auth.controller';
import { TeacherAuthSevice } from './teacher/teacher.auth.service';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule, TeacherModule],
  controllers: [AdminAuthController, TeacherAuthController],
  providers: [AdminAuthService, TeacherAuthSevice],
})
export class AuthModule {}
