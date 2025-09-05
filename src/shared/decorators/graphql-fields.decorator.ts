import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import * as graphqlFields from 'graphql-fields';

const parsePrismaSelect = (example) =>
  Object.keys(example).reduce(
    ({ select }, key) => {
      const field = example[key];
      const child = Object.keys(field);

      return !child.length
        ? { select: { ...select, [key]: true } }
        : {
            select: {
              ...select,
              [key]: parsePrismaSelect(field),
            },
          };
    },
    { select: {} },
  );

export const GraphQLFields: () => ParameterDecorator = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const fields = parsePrismaSelect(graphqlFields(ctx.getInfo()));

    return { fields };
  },
);
