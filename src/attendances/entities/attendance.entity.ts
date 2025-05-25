import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Attendance {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  date: Date;

  @Field()
  @Column()
  status: string;

//   @Field()
//   @Column()
//   studentId: number;

//   @Field()
//   @Column()
//   scheduleId: number;
}
