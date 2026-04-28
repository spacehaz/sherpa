/**
 * offers.service.ts
 * Business logic for offers data fetch.
 * Delegates DB queries to OffersRepository.
 */

import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { OffersRepository } from './offers.repository';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOffersQueryDto } from './dto/get-offers-query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class OffersService {
  constructor(
    private readonly offersRepository: OffersRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async update (
    userId: string,
    offerId: string,
    offerData: UpdateOfferDto
  ) {
    const offer = await this.offersRepository.findById(offerId);
    if (!offer) {
      throw new NotFoundException('Offer not found')
    }

    if (offer.userId !== userId) {
      throw new ForbiddenException('Only an owner can update an offer')
    }

    if (offer.status !== 'pending') {
      throw new BadRequestException('Cannot update an offer that is already accepted or finished');
    }

    return await this.offersRepository.update(offerId, offerData)

  }

  async delete (
    userId: string,
    offerId: string,
  ) {
    const offer = await this.offersRepository.findById(offerId);
    if (!offer) {
      throw new NotFoundException('Offer not found')
    }
    if (offer.userId !== userId) {
      throw new ForbiddenException('Only an owner can delete an offer')
    }
    return await this.offersRepository.delete(offerId)
  }

  async create (
    userId: string,
    offerData: CreateOfferDto,
    file?: Express.Multer.File,
  ) {
    let imageUrl: string | undefined
    if (file) {
      imageUrl = await this.cloudinaryService.uploadBuffer(file.buffer, 'sherpa/offers')
    }
    return await this.offersRepository.create(userId, offerData, imageUrl)
  }

  async findById (offerId: string) {
    const offer = await this.offersRepository.findById(offerId);
    if (!offer) {
      throw new NotFoundException('Offer not found')
    }

    return offer
  }

  async findAll (
    params: GetOffersQueryDto
  ) {
    return await this.offersRepository.findAll(params);
  }

  async findAllByUser (userId: string, params: GetOffersQueryDto) {
    return await this.offersRepository.findAllByUser(userId, params);
  }
}
