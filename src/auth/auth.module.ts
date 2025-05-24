import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthController } from './admin/admin.auth.controller';
import { AdminAuthService } from './admin/admin.auth.service';
import { TeacherAuthController } from './teacher/teacher.auth.controller';
import { TeacherAuthSevice } from './teacher/teacher.auth.service';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentsModule } from '../students/students.module';
import { StudentAuthController } from './students/students.auth.controller';
import { StudentAuthService } from './students/student.auth.service';

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule, TeacherModule, StudentsModule],
  controllers: [AdminAuthController, TeacherAuthController, StudentAuthController],
  providers: [AdminAuthService, TeacherAuthSevice, StudentAuthService],
})
export class AuthModule {}
