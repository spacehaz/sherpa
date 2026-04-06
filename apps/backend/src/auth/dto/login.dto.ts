/**
 * login.dto.ts
 * Defines and validates the request body for POST /auth/login.
 */

import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
