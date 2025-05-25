import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

@InputType()
export class CreateStudentGroupDto {
  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  period: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  is_active: boolean;

//   @Field()
  //   @IsNotEmpty()
  //   @IsString()
//   studentId: string;

//   @Field()
  //   @IsNotEmpty()
  //   @IsString()
//   groupId: string;
}
