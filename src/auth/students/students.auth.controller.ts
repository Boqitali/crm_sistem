import { Body, Controller, Get, HttpCode, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { LoginDto } from "../dto/login.dto";
import { StudentAuthService } from "./student.auth.service";

@Controller("auth/student")
export class StudentAuthController {
  constructor(private readonly studentAuthService: StudentAuthService) {}

  @Post("login")
  @HttpCode(200)
  async loginAdmin(
    @Body() loginAdminDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.studentAuthService.loginStudent(loginAdminDto, res);
  }

  @Get("logout")
  async logoutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.studentAuthService.logoutStudent(req, res);
  }

  @Post("refresh-token")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.studentAuthService.refreshStudent(req, res);
  }
}
