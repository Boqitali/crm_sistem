import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

@InputType()
export class CreateAttendanceDto {
  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  date: Date;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  status: string;

  //   @Field()
  //   @IsNotEmpty()
  //   @IsString()
  //   studentId: number;

  //   @Field()
  //   @IsNotEmpty()
  //   @IsString()
  //   scheduleId: number;
}
