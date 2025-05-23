import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../../admin/admin.service";
import { Admin } from "../../admin/entities/admin.entity";
import { LoginDto } from "../dto/login.dto";
import * as bcrypt from "bcrypt"
import { Response } from "express";

@Injectable()
export class AdminAuthService {
  constructor(
    
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      adminname: admin.firstName,
      email: admin.email,
      is_creator: admin.is_creator,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return { accessToken, refreshToken };
  }

  async loginAdmin(loginAdminDto: LoginDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException("email yoki parol xato");
    }

    const validPassword = await bcrypt.compare(
      loginAdminDto.password,
      admin.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("email yoki parol xato");
    }

    const tokens = await this.generateToken(admin);

    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    admin.refresh_token = hashed_refresh_token;
    await this.adminService.save(admin)

    return {
      message: "admin logged successfully",
      token: tokens.accessToken,
    };
  }
}
