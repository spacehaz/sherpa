/**
 * deals.service.ts
 * Business logic for deals data fetch.
 * Delegates DB queries to DealsRepository.
 */

import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { DealsRepository } from './deals.repository';
import { UpdateDealStatusDto } from './dto/update-deal-status.dto';
import { CreateDealDto } from './dto/create-deal.dto';
import { OffersRepository } from 'src/offers/offers.repository';
import { RequestsRepository } from 'src/requests/requests.repository';
import { GetMyDealsQueryDto } from './dto/get-my-deals-query.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMyDealMessagesQueryDto } from './dto/get-my-deal-messages-query.dto';


@Injectable()
export class DealsService {
  constructor(
    private readonly dealsRepository: DealsRepository,
    private readonly offersRepository: OffersRepository,
    private readonly requestsRepository: RequestsRepository,
  ) {}

  async updateDealStatus (
    userId: string,
    dealId: string,
    dealData: UpdateDealStatusDto
  ) {
    const { status: newStatus } = dealData

    if (newStatus === 'pending') {
      throw new BadRequestException('Cannot update a deal status to pending');
    }

    const deal = await this.dealsRepository.findById(dealId);
    if (!deal) {
      throw new NotFoundException('Deal not found')
    }

    if (deal.status === 'completed' || deal.status === 'rejected') {
      throw new BadRequestException('Cannot update a deal that is already completed or rejected');
    }

    if (newStatus === 'accepted' || newStatus === 'rejected') {
      const { responderId } = deal
      if (userId === responderId) {
        // request made by someone who is responding
        const updatedDeal = await this.dealsRepository.updateStatus(dealId, {
          status: newStatus
        })

        if (newStatus === 'accepted') {
          await this.dealsRepository.rejectOtherDeals(dealId, deal.offerId || undefined, deal.requestId || undefined)
        }

        return updatedDeal

      } else {
        throw new ForbiddenException('Cannot update a deal status to accepted/rejected. Only responder can do it');
      }
    }


    if (newStatus === 'completed') {
      const { travelerId } = deal
      if (userId === travelerId) {
        // request made by traveler
        return await this.dealsRepository.updateStatus(dealId, {
          status: newStatus
        })

      } else {
        throw new ForbiddenException('Cannot update a deal status to completed. Only traveler can do it');
      }
    }

    throw new BadRequestException('Status is not correct');

  }


  async deleteDeal (
    userId: string,
    dealId: string
  ) {
    const deal = await this.dealsRepository.findById(dealId);
    if (!deal) {
      throw new NotFoundException('Deal not found')
    }

    const { initiatorId, status } = deal

    if (initiatorId !== userId) {
      throw new ForbiddenException('Only initiator can delete the deal')
    }

    if (status !== 'pending') {
      throw new ForbiddenException('Only pending deals can be deleted')
    }

    return this.dealsRepository.delete(dealId)
  }


  async createDeal (
    userId: string,
    dealData: CreateDealDto
  ) {

    const {
      offerId,
      requestId
    } = dealData

    if (!offerId && !requestId) {
      throw new BadRequestException('Cannot create a deal without offerId or requestId');
    }

    if (offerId && requestId) {
      throw new BadRequestException('Cannot create a deal with both an offerId and a requestId');
    }


    if (offerId) {
      const offer = await this.offersRepository.findById(offerId)

      if (!offer) {
        throw new NotFoundException('Offer not found')
      }

      const { userId: responderId } = offer

      if (userId === responderId) {
        throw new ForbiddenException('Cannot create a deal for own offer');
      }
      return await this.dealsRepository.create(
        userId,
        responderId,
        responderId, // traveler is the same as responderId
        dealData
      )
    }

    if (requestId) {
      const request = await this.requestsRepository.findById(requestId)
      if (!request) {
        throw new NotFoundException('Request not found')
      }

      const { userId: responderId } = request

      if (userId === responderId) {
        throw new ForbiddenException('Cannot create a deal for own request');
      }

      return await this.dealsRepository.create(
        userId,
        responderId,
        userId, // traveler is the same as userId
        dealData
      )
    }
  }

  async findMyDeals (
    userId: string,
    params: GetMyDealsQueryDto
  ) {
    return await this.dealsRepository.findMyDeals(userId, params);
  }

  async createMessage (
    userId: string, // comes from jwt
    dealId: string, // comes from params of url
    messageData: CreateMessageDto // comes from the body
  ) {

    const deal = await this.dealsRepository.findById(dealId)

    if (!deal) {
      throw new NotFoundException('Deal not found')
    }
    const { responderId, initiatorId } = deal

    if (userId !== responderId && userId !== initiatorId) {
      throw new ForbiddenException('Cannot create messages for the deal. User should be the participant of the deal to send messages')
    }

    return await this.dealsRepository.createMessage(
      dealId,
      userId,
      messageData
    )
  }

  async findMessages (
    userId: string, // comes from jwt
    dealId: string, // comes from params of url
    messagesData: GetMyDealMessagesQueryDto
  ) {
    const deal = await this.dealsRepository.findById(dealId)

    if (!deal) {
      throw new NotFoundException('Deal not found')
    }
    const { responderId, initiatorId } = deal
    if (userId !== responderId && userId !== initiatorId) {
      throw new ForbiddenException('Cannot get messages for the deal. User should be the participant of the deal to fetch messages')
    }
    return await this.dealsRepository.findMessages(dealId, messagesData)
  }

  async findById (
    userId: string,
    dealId: string
  ) {
    const deal = await this.dealsRepository.findById(dealId)
    if (!deal) {
      throw new NotFoundException('Deal not found')
    }

    const {
      responderId,
      initiatorId
    } = deal

    if (userId !== responderId && userId !== initiatorId) {
      throw new ForbiddenException('Cannot get a deal. Current user is not an initiator or a responder');
    }

    return deal
  }

}
