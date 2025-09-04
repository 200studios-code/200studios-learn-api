import { getSessionFromContext } from '@/shared/utils/session.util';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const Session = createParamDecorator(
  async (_, context: ExecutionContext) => {
    return await getSessionFromContext(context);
  },
);
