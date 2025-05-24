import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  title: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  description: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  price: number;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  duration: number;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  lessons_in_a_week: number;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  lesson_duration: number;
}
