import { Module } from '@nestjs/common';
import { TeacherGroupsService } from './teacher_groups.service';
import { TeacherGroupsController } from './teacher_groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentGroup } from '../student_groups/entities/student_group.entity';
import { TeacherGroupResolver } from './teacher_groups.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StudentGroup])],
  controllers: [TeacherGroupsController],
  providers: [TeacherGroupsService, TeacherGroupResolver],
})
export class TeacherGroupsModule {}
