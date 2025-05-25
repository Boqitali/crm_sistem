import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendance } from "./entities/attendance.entity";
import { Repository } from "typeorm";

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>
  ) {}
  create(createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceRepo.save(createAttendanceDto);
  }

  findAll() {
    return this.attendanceRepo.find();
  }

  findOne(id: number) {
    return this.attendanceRepo.findOneBy({ id });
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    const result = await this.attendanceRepo.update(id, updateAttendanceDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }
    return this.attendanceRepo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.attendanceRepo.delete({ id });
  }
}
