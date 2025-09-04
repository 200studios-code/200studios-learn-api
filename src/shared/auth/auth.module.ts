import { AuthController } from '@/shared/auth/auth.controller';
import { AuthGuard } from '@/shared/auth/auth.guard';
import { AuthMiddleware } from '@/shared/auth/auth.middleware';
import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperTokensModule } from 'supertokens-nestjs';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session, { VerifySessionOptions } from 'supertokens-node/recipe/session';
import UserMetadata from 'supertokens-node/recipe/usermetadata';

@Global()
@Module({
  imports: [
    SuperTokensModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        framework: 'express',
        supertokens: {
          connectionURI: configService.get('SUPERTOKENS_CONNECTION_URI'),
          apiKey: configService.get('SUPERTOKENS_API_KEY'),
        },
        appInfo: {
          appName: configService.get('SUPERTOKENS_APP_NAME'),
          apiDomain: configService.get('BACKEND_DOMAIN'),
          websiteDomain: configService.get('FRONTEND_DOMAIN'),
        },
        recipeList: [
          Passwordless.init({
            flowType: 'MAGIC_LINK',
            contactMethod: 'EMAIL',
            override: {
              functions: (originalImplementation) => {
                return {
                  ...originalImplementation,
                  consumeCode: async function (input) {
                    const response =
                      await originalImplementation.consumeCode(input);

                    if (
                      response.status === 'OK' &&
                      input.session === undefined
                    ) {
                      // TODO: implement this
                      //await prismaService.$transaction(async (prisma) => {
                      // const query = new UserQuery(
                      //   ['uuid', 'email', 'name'],
                      //   { email: input.email },
                      //   null,
                      // );
                      // const user = await prisma.user.findFirst(query.build());
                      // await updateUserMetadata(response.user.id, {
                      //   uuid: user.uuid,
                      //   email: user.email,
                      //   name: user.name,
                      //   authId: response.user.id,
                      // });
                      //});
                    }
                    return response;
                  },
                };
              },
            },
          }),
          Session.init({
            getTokenTransferMethod: () => 'cookie',
          }),
          UserMetadata.init(),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthGuard,
      useFactory: () => {
        const options: VerifySessionOptions = {};
        return new AuthGuard(options);
      },
    },
  ],
  exports: [AuthGuard],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
