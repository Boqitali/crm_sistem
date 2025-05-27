import { Column, PrimaryGeneratedColumn } from "typeorm";


export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  table_name: string;

  @Column()
  files: string;

  @Column()
  type: string;

  @Column()
  file_name: string;

  @Column()
  size: number;

//   @Column()
//   teacherId: number;
}
