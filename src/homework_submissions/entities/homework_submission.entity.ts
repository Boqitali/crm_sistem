import { Column, PrimaryGeneratedColumn } from "typeorm";

export class HomeworkSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_url: string;

  @Column()
  submitted_at: Date;

  @Column()
  commit: string;

  @Column()
  status: string;

  //   @Column()
  //   homeworkId: number;

  //   @Column()
  //   studentId: number;
}
