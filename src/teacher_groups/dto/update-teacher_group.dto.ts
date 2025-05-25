import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

@InputType()
export class UpdateTeacherGroupDto {
  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  teacherId: number;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  groupId: number;
}
