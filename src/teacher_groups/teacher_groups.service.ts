import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTeacherGroupDto } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher_group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeacherGroup } from "./entities/teacher_group.entity";

@Injectable()
export class TeacherGroupsService {
  constructor(
    @InjectRepository(TeacherGroup)
    private readonly teacherGroupRepo: Repository<TeacherGroup>
  ) {}
  create(createTeacherGroupDto: CreateTeacherGroupDto) {
    return this.teacherGroupRepo.save(createTeacherGroupDto);
  }

  findAll() {
    return this.teacherGroupRepo.find();
  }

  findOne(id: number) {
    return this.teacherGroupRepo.findOneBy({ id });
  }

  async update(id: number, updateTeacherGroupDto: UpdateTeacherGroupDto) {
    const result = await this.teacherGroupRepo.update(
      id,
      updateTeacherGroupDto
    );
    if (result.affected === 0) {
      throw new NotFoundException(``);
    }
    return this.teacherGroupRepo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.teacherGroupRepo.delete({ id });
  }
}
