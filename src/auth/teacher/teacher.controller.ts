import { Controller } from '@nestjs/common';
import { TeracherAuthSevice } from './teacher.service';

@Controller("auth")
export class TeracherAuthController {
  constructor(private readonly authService: TeracherAuthSevice) {}
}
