import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { hash } from "crypto";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const { password, confirm_password, ...otherDto } = createStudentDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Paroller mos emas!");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newStudent = await this.studentRepo.save({
      ...otherDto,
      password: hashed_password,
    });
    return newStudent;
  }

  findAll() {
    return this.studentRepo.find();
  }

  findByEmail(email: string) {
    return this.studentRepo.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.studentRepo.findOneBy({ id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const { password, confirm_password, ...otherDto } = updateStudentDto;
    const student = await this.studentRepo.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    if (password) {
      student.password = await bcrypt.hash(password, 7);
    }
    Object.assign(student, otherDto);
    return await this.studentRepo.save(student);
  }

  remove(id: number) {
    return this.studentRepo.delete({ id });
  }

  async save(admin: Student) {
    return this.studentRepo.save(admin);
  }
}
