import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { Request, Response } from "express";
import { TeacherAuthSevice } from "./teacher.auth.service";

@Controller("auth/teacher")
export class TeacherAuthController {
  constructor(private readonly teacherAuthService: TeacherAuthSevice) {}

  @Post("login")
  @HttpCode(200)
  async loginTeacher(
    @Body() loginTeacherDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.teacherAuthService.loginTeacher(loginTeacherDto, res);
  }

  @Get("logout")
  async logoutTeacher(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.teacherAuthService.logoutTeacher(req, res);
  }

  @Post("refresh-token")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.teacherAuthService.refreshToken(req, res);
  }
}
