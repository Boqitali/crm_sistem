import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStudentGroupDto } from "./dto/create-student_group.dto";
import { UpdateStudentGroupDto } from "./dto/update-student_group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentGroup } from "./entities/student_group.entity";
import { Repository } from "typeorm";

@Injectable()
export class StudentGroupsService {
  constructor(
    @InjectRepository(StudentGroup)
    private readonly studentGroupRepo: Repository<StudentGroup>
  ) {}
  create(createStudentGroupDto: CreateStudentGroupDto) {
    return this, this.studentGroupRepo.save(createStudentGroupDto);
  }

  findAll() {
    return this.studentGroupRepo.find();
  }

  findOne(id: number) {
    return this.studentGroupRepo.findOneBy({ id });
  }

  async update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    const result = await this.studentGroupRepo.update(
      id,
      updateStudentGroupDto
    );
    if (result.affected === 0) {
      throw new NotFoundException(`StudentGroup with ID ${id} not found`);
    }
    return this.studentGroupRepo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.studentGroupRepo.delete({ id });
  }
}
