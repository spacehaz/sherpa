/**
 * requests.service.ts
 * Business logic for request data fetch.
 * Delegates DB queries to RequestsRepository.
 */

import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { GetRequestsQueryDto } from './dto/get-requests-query.dto';

@Injectable()
export class RequestsService {
  constructor(
    private readonly requestsRepository: RequestsRepository,
  ) {}

  async update (
    userId: string,
    requestId: string,
    requestData: UpdateRequestDto
  ) {
    const request = await this.requestsRepository.findById(requestId);
    if (!request) {
      throw new NotFoundException('Request not found')
    }

    if (request.userId !== userId) {
      throw new ForbiddenException('Only an owner can update a request')
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Cannot update a request that is already accepted or finished');
    }

    return await this.requestsRepository.update(requestId, requestData)

  }

  async delete (
    userId: string,
    requestId: string,
  ) {
    const request = await this.requestsRepository.findById(requestId);
    if (!request) {
      throw new NotFoundException('Request not found')
    }
    if (request.userId !== userId) {
      throw new ForbiddenException('Only an owner can delete a request')
    }
    return await this.requestsRepository.delete(requestId)
  }

  async create (
    userId: string,
    requestData: CreateRequestDto
  ) {

    return await this.requestsRepository.create(userId, requestData)
  }

  async findById (requestId: string) {
    const request = await this.requestsRepository.findById(requestId);
    if (!request) {
      throw new NotFoundException('Request not found')
    }

    return request
  }

  async findAll (
    params: GetRequestsQueryDto
  ) {
    return await this.requestsRepository.findAll(params);
  }
}
