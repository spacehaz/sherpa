/**
 * users.service.ts
 * Business logic for users data fetch.
 * Delegates DB queries to UsersRepository.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async updateUser (
    userId: string,
    userData: UpdateUserDto
  ) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const userUpdated = await this.usersRepository.update(userId, userData)
    const { passwordHash, ...rest } = userUpdated
    return rest

  }

  async getUser (userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const { passwordHash, ...rest } = user

    return rest
  }
}
