import { StatusCodes } from 'http-status-codes';

import { Instapost } from '@/api/instapost/instapostModel';
import { instapostRepository } from '@/api/instapost/instapostRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const instapostService = {
  // Retrieves all instapost from the database
  findAll: async (): Promise<ServiceResponse<Instapost[] | null>> => {
    try {
      const instapost = await instapostRepository.findAllAsync();
      if (!instapost) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Instapost found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Instapost[]>(ResponseStatus.Success, 'Instapost found', instapost, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all instapost: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves single instapost by their ID
  findById: async (id: number): Promise<ServiceResponse<Instapost | null>> => {
    try {
      const instapost = await instapostRepository.findByIdAsync(id);
      if (!instapost) {
        return new ServiceResponse(ResponseStatus.Failed, 'Instapost not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Instapost>(ResponseStatus.Success, 'Instapost found', instapost, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding instapost with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
