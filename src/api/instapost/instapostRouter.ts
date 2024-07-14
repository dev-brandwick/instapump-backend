import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetInstapostSchema, InstapostSchema } from '@/api/instapost/instapostModel';
import { instapostService } from '@/api/instapost/instapostService';
import { UserSchema } from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const instapostRegistry = new OpenAPIRegistry();

instapostRegistry.register('Instapost', InstapostSchema);

export const instapostRouter: Router = (() => {
  const router = express.Router();

  instapostRegistry.registerPath({
    method: 'get',
    path: '/instaposts',
    tags: ['Instapost'],
    responses: createApiResponse(z.array(InstapostSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await instapostService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  instapostRegistry.registerPath({
    method: 'get',
    path: '/instaposts/{id}',
    tags: ['Instapost'],
    request: { params: GetInstapostSchema.shape.params },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetInstapostSchema), async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await instapostService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
