import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>
  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const { password, confirm_password, ...otherDto } = createTeacherDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas!");
    }

    const hashed_password = await bcrypt.hash(password, 7);
    const newTeacher = await this.teacherRepo.save({
      ...otherDto,
      password: hashed_password,
    });
    return newTeacher;
  }

  findAll() {
    return this.teacherRepo.find();
  }

  findByEmail(email: string) {
    return this.teacherRepo.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.teacherRepo.findOneBy({ id });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const { password, confirm_password, ...otherDto } = updateTeacherDto;

    const admin = await this.teacherRepo.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (password) {
      admin.password = await bcrypt.hash(password, 7);
    }

    Object.assign(admin, otherDto);
    return await this.teacherRepo.save(admin);
  }

  remove(id: number) {
    return this.teacherRepo.delete({ id });
  }

  async save(admin: Teacher) {
    return this.teacherRepo.save(admin);
  }
}
