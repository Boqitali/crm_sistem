import { PartialType } from "@nestjs/mapped-types";
import { CreateTeacherDto } from "./create-teacher.dto";
import { Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
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
  //   @IsEmail()
  email: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsPhoneNumber("UZ")
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
  bith_data: Date;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  avatar_url: string;
}
