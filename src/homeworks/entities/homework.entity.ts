
import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";

@Entity()
export class Homework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desciption: string;

  @Column()
  deadline: Date;

  @Column()
  file_url: string;

//   @Column()
//   teacherId: number;

//   @Column()
//   groupId: number;
}
