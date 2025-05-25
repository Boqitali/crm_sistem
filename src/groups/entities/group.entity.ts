import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Group {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  start_date: Date;

  @Field()
  @Column()
  end_date: Date;

  @Field()
  @Column()
  status: string;

//   @Field()
//   @Column()
//   courseId: number;
}
