import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Schedule } from "./entities/schedule.entity";
import { Repository } from "typeorm";

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>
  ) {}
  create(createScheduleDto: CreateScheduleDto) {
    return this.scheduleRepo.save(createScheduleDto);
  }

  findAll() {
    return this.scheduleRepo.find();
  }

  findOne(id: number) {
    return this.scheduleRepo.findOneBy({ id });
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const result = await this.scheduleRepo.update(id, updateScheduleDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Schedule with ${id} not found`);
    }
    return this.scheduleRepo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.scheduleRepo.delete({ id });
  }
}
