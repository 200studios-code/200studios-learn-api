import type { AuthUser } from '@/shared/auth/models/auth-user.model';
import type { SessionWithMetadata } from '@/shared/types';
import type { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getUserMetadata } from 'supertokens-node/recipe/usermetadata';

export async function getSessionFromContext(
  context: ExecutionContext,
): Promise<SessionWithMetadata> {
  let req: any;
  if (context['contextType'] === 'http') {
    const ctx = context.switchToHttp();
    req = ctx.getRequest();
  } else if (context['contextType'] === 'graphql') {
    const gqlContext = GqlExecutionContext.create(context);
    req = gqlContext.getContext().req;
  } else {
    throw new Error('Unsupported context type');
  }

  const session = req.session as SessionWithMetadata;
  const userId = session.getUserId();
  const metadata = (await getUserMetadata(userId)).metadata as AuthUser;

  session.metadata = metadata;

  return session;
}
