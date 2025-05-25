import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

@InputType()
export class UpdateGroupDto {
  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  name: string;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  start_date: Date;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  end_date: Date;

  @Field()
  //   @IsNotEmpty()
  //   @IsString()
  status: string;

//   @Field()
  //   @IsNotEmpty()
  //   @IsString()
//   courseId: number;
}
