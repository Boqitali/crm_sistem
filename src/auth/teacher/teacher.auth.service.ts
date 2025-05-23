import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { TeacherService } from "../../teacher/teacher.service";
import { JwtService } from "@nestjs/jwt";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { LoginDto } from "../dto/login.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

@Injectable()
export class TeacherAuthSevice {
  constructor(
    private readonly teracherService: TeacherService,
    private readonly jwtService: JwtService
  ) {}

  async generateToken(admin: Teacher) {
    const payload = {
      id: admin.id,
      adminname: admin.firstName,
      email: admin.email,
      is_creator: admin.is_active,
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

  async loginTeacher(loginTeacherDto: LoginDto, res: Response) {
    const teacher = await this.teracherService.findByEmail(
      loginTeacherDto.email
    );

    if (!teacher) {
      throw new UnauthorizedException("email yoki parol xato");
    }

    const validPassword = await bcrypt.compare(
      loginTeacherDto.password,
      teacher.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("email yoki parol xato");
    }

    const tokens = await this.generateToken(teacher);

    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    teacher.refresh_token = hashed_refresh_token;
    await this.teracherService.save(teacher);

    return {
      message: "teacher logged successfully",
      token: tokens.accessToken,
    };
  }

  async logoutTeacher(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const teacher = await this.teracherService.findByEmail(payload.email);

    if (!teacher) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    res.clearCookie("refresh-token", {
      httpOnly: true,
    });

    teacher.refresh_token = "";
    await this.teracherService.save(teacher);

    return {
      message: "teacher logged out",
    };
  }

  async refreshToken(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const teacher = await this.teracherService.findByEmail(payload.email);

    if (!teacher) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    const tokens = await this.generateToken(teacher);

    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    teacher.refresh_token = hashed_refresh_token;
    await this.teracherService.save(teacher);

    return {
      message: "Refresh token yangilandi",
      token: tokens.accessToken,
    };
  }
}
