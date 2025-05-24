import { PartialType } from "@nestjs/mapped-types";
import { CreateStudentDto } from "./create-student.dto";
import { Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  firstName: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  lastName: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  email: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  phone: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  password: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  confirm_password: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  gender: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  date_of_borth: Date;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  avatar_url: string;
}
