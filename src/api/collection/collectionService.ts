import { StatusCodes } from 'http-status-codes';

import { Collection } from '@/api/collection/collectionModel';
import { collectionRepository } from '@/api/collection/collectionRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const collectionService = {
  // Retrieves all collection from the database
  findAll: async (): Promise<ServiceResponse<Collection[] | null>> => {
    try {
      const collection = await collectionRepository.findAllAsync();
      if (!collection) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Collection found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Collection[]>(ResponseStatus.Success, 'Collection found', collection, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all collection: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves single collection by their ID
  findById: async (id: number): Promise<ServiceResponse<Collection | null>> => {
    try {
      const collection = await collectionRepository.findByIdAsync(id);
      if (!collection) {
        return new ServiceResponse(ResponseStatus.Failed, 'Collection not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Collection>(ResponseStatus.Success, 'Collection found', collection, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding collection with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
