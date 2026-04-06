/**
 * register.dto.ts
 * Defines and validates the request body for POST /auth/register.
 * class-validator decorators run automatically via the global ValidationPipe.
 */

import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
