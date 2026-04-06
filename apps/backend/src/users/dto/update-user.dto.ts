/**
 * update-user.dto.ts
 * Defines and validates the request body for PATCH /users/me.
 * All fields are optional — user can update any subset of their profile.
 */

import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @IsOptional()
  @IsString()
  hometown?: string;
}
