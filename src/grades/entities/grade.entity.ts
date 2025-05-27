import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: number;

  @Column()
  date: Date;

  @Column()
  comment: string;

//   @Column()
//   studentId: number;

//   @Column()
//   teacherId: number;

//   @Column()
//   homeworkSubmissionId: number;
}
