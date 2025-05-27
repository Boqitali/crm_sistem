import { Module } from '@nestjs/common';
import { HomeworksService } from './homeworks.service';
import { HomeworksController } from './homeworks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homework } from './entities/homework.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Homework])],
  controllers: [HomeworksController],
  providers: [HomeworksService],
})
export class HomeworksModule {}
