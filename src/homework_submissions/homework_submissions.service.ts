import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework_submission.dto";
import { UpdateHomeworkSubmissionDto } from "./dto/update-homework_submission.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HomeworkSubmission } from "./entities/homework_submission.entity";
import { Repository } from "typeorm";

@Injectable()
export class HomeworkSubmissionsService {
  constructor(
    @InjectRepository(HomeworkSubmission)
    private readonly homeworkSubmissionRepo: Repository<HomeworkSubmission>
  ) {}
  create(createHomeworkSubmissionDto: CreateHomeworkSubmissionDto) {
    return this.homeworkSubmissionRepo.save(createHomeworkSubmissionDto);
  }

  findAll() {
    return this.homeworkSubmissionRepo.find();
  }

  findOne(id: number) {
    return this.homeworkSubmissionRepo.findOneBy({ id });
  }

  async update(
    id: number,
    updateHomeworkSubmissionDto: UpdateHomeworkSubmissionDto
  ) {
    const homeworkSubmission = await this.homeworkSubmissionRepo.preload({
      id,
      ...updateHomeworkSubmissionDto,
    });

    if (!homeworkSubmission) {
      return new NotFoundException(
        `HomeworkSubmission with ID ${id} not found`
      );
    }
    return this.homeworkSubmissionRepo.save(homeworkSubmission);
  }

  remove(id: number) {
    return this.homeworkSubmissionRepo.delete({ id });
  }
}
