import { Module } from '@nestjs/common';
import { HomeworkSubmissionsService } from './homework_submissions.service';
import { HomeworkSubmissionsController } from './homework_submissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkSubmission } from './entities/homework_submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeworkSubmission])],
  controllers: [HomeworkSubmissionsController],
  providers: [HomeworkSubmissionsService],
})
export class HomeworkSubmissionsModule {}
