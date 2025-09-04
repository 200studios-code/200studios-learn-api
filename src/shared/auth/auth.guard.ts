import {
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Error as STError } from 'supertokens-node';
import type { VerifySessionOptions } from 'supertokens-node/recipe/session';
import Session from 'supertokens-node/recipe/session';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';

export class AuthGuard implements CanActivate {
  constructor(private readonly verifyOptions?: VerifySessionOptions) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    if (ctx['contextType'] === 'http') {
      const res = ctx.getResponse();
      let err = undefined;

      await verifySession(this.verifyOptions)(
        ctx.getRequest(),
        res,
        (errorRes: any) => {
          err = errorRes;
        },
      );

      if (res.headersSent) {
        throw new STError({
          message: 'RESPONSE_SENT',
          type: 'RESPONSE_SENT',
        });
      }

      if (err) {
        throw err;
      }

      return true;
    } else if (ctx['contextType'] === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const { req, res } = gqlContext.getContext();

      try {
        const session = await Session.getSession(req, res, this.verifyOptions);
        req.session = session;
      } catch {
        throw new UnauthorizedException();
      }

      return true;
    }

    return false;
  }
}
