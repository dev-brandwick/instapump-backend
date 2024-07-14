import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { CollectionSchema, GetCollectionSchema } from '@/api/collection/collectionModel';
import { collectionService } from '@/api/collection/collectionService';
import { UserSchema } from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const collectionRegistry = new OpenAPIRegistry();

collectionRegistry.register('Collection', CollectionSchema);

export const collectionRouter: Router = (() => {
  const router = express.Router();

  collectionRegistry.registerPath({
    method: 'get',
    path: '/collections',
    tags: ['Collection'],
    responses: createApiResponse(z.array(CollectionSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await collectionService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  collectionRegistry.registerPath({
    method: 'get',
    path: '/collections/{id}',
    tags: ['Collection'],
    request: { params: GetCollectionSchema.shape.params },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetCollectionSchema), async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await collectionService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
