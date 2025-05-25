import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class StudentGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  period: string;

  @Field()
  @Column({ default: false })
  is_active: boolean;

  @Field()
  @Column()
  studentId: string;

  @Field()
  @Column()
  groupId: string;
}
