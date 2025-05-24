import { Student } from './../../students/entities/student.entity';
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "../dto/login.dto";
import * as bcrypt from "bcrypt"
import { Request, Response } from "express";
import { StudentsService } from "../../students/students.service";

@Injectable()
export class StudentAuthService {
  constructor(
    private readonly studentService: StudentsService,
    private readonly jwtService: JwtService
  ) {}

  async generateToken(admin: Student) {
    const payload = {
      id: admin.id,
      adminname: admin.firstName,
      email: admin.email,
      is_active: admin.is_active,
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

  async loginStudent(loginStudentDto: LoginDto, res: Response) {
    const student = await this.studentService.findByEmail(loginStudentDto.email);

    if (!student) {
      throw new UnauthorizedException("email yoki parol xato");
    }

    const validPassword = await bcrypt.compare(
      loginStudentDto.password,
      student.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("email yoki parol xato");
    }

    const tokens = await this.generateToken(student);

    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    student.refresh_token = hashed_refresh_token;
    await this.studentService.save(student);

    return {
      message: "student logged successfully",
      token: tokens.accessToken,
    };
  }

  async logoutStudent(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const student = await this.studentService.findByEmail(payload.email);

    if (!student) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    res.clearCookie("refresh-token", {
      httpOnly: true,
    });

    student.refresh_token = "";
    await this.studentService.save(student);

    return {
      message: "student logged out",
    };
  }

  async refreshStudent(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const student = await this.studentService.findByEmail(payload.email);

    if (!student) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    const tokens = await this.generateToken(student);

    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    student.refresh_token = hashed_refresh_token;
    await this.studentService.save(student);

    return {
      message: "Refresh token yangilandi",
      token: tokens.accessToken,
    };
  }
}
