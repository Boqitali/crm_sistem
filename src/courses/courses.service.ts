import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>
  ) {}
  create(createCourseDto: CreateCourseDto) {
    return this.courseRepo.save(createCourseDto);
  }

  findAll() {
    return this.courseRepo.find();
  }

  findOne(id: number) {
    return this.courseRepo.findOneBy({ id });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const result = await this.courseRepo.update(id, updateCourseDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return await this.courseRepo.findOne({ where: { id } }); // yangilangan obyektni qaytaramiz
  }

  remove(id: number) {
    return this.courseRepo.delete({ id });
  }
}
