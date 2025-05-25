import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { AttendancesResolver } from './attendances.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  controllers: [AttendancesController],
  providers: [AttendancesService, AttendancesResolver],
})
export class AttendancesModule {}
