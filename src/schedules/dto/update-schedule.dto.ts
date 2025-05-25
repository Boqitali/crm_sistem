import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

@InputType()
export class UpdateScheduleDto {
  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  day_of_week: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  start_time: Date;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  end_time: Date;

  //   @Field()
  //   @Column()
  //   groupId: number;
}
