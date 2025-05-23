import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AdminAuthService } from "./admin.auth.service";
import { LoginDto } from "../dto/login.dto";

@Controller("auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("login")
  @HttpCode(200)
  async loginAdmin(
    @Body() loginAdminDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.loginAdmin(loginAdminDto, res );
  }
}
