import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Grade } from "./entities/grade.entity";
import { Repository } from "typeorm";

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade) private readonly gradeRepo: Repository<Grade>
  ) {}
  create(createGradeDto: CreateGradeDto) {
    return this.gradeRepo.save(createGradeDto);
  }

  findAll() {
    return this.gradeRepo.find();
  }

  findOne(id: number) {
    return this.gradeRepo.findOneBy({ id });
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    const grade = await this.gradeRepo.preload({ id, ...updateGradeDto });

    if (!grade) {
      console.log(id);
      throw new NotFoundException(`Grade with ID ${id} not found`);
    }
    return this.gradeRepo.save(grade);
  }

  remove(id: number) {
    return this.gradeRepo.delete({ id });
  }
}
