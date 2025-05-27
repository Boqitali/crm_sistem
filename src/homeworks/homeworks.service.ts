import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Homework } from "./entities/homework.entity";
import { Repository } from "typeorm";

@Injectable()
export class HomeworksService {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepo: Repository<Homework>
  ) {}
  create(createHomeworkDto: CreateHomeworkDto) {
    return this.homeworkRepo.save(createHomeworkDto);
  }

  findAll() {
    return this.homeworkRepo.find();
  }

  findOne(id: number) {
    return this.homeworkRepo.findOneBy({id});
  }

  async update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    const homework = await this.homeworkRepo.preload({ id, ...updateHomeworkDto });

    if (!homework) {
      console.log(id);
      throw new NotFoundException(`Homework with ID ${id} not found`);
    }
    return this.homeworkRepo.save(homework);
  }

  remove(id: number) {
    return this.homeworkRepo.delete({id});
  }
}
