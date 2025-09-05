import { DEFAULT_USER_TIMEZONE } from '@/shared/constants/timezone.constant';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { fromZonedTime } from 'date-fns-tz';

const QUERY_FILTERS = [
  'equals',
  'in',
  'contains',
  'startsWith',
  'endsWith',
  'gt',
  'gte',
  'lt',
  'lte',
  'not',
  'notIn',
];

function transformWhere(where: any): any {
  if (!where) return undefined;

  const prismaWhere: Record<string, any> = {};

  for (const key in where) {
    const value = where[key];

    if (isFilterObject(value)) {
      prismaWhere[key] = transformFilter(value);
    } else if (isPlainObject(value)) {
      prismaWhere[key] = transformWhere(value);
    } else if (Array.isArray(value)) {
      prismaWhere[key] = value.map(transformWhere);
    } else {
      prismaWhere[key] = value;
    }
  }

  return prismaWhere;
}

function isPlainObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isFilterObject(value: any): boolean {
  return isPlainObject(value) && QUERY_FILTERS.includes(Object.keys(value)[0]);
}

function transformFilter(filter: Record<string, any>): any {
  const prismaFilter: Record<string, any> = {};

  for (const key in filter) {
    if (['contains', 'startsWith', 'endsWith'].includes(key)) {
      prismaFilter[key] = filter[key];
      prismaFilter.mode = 'insensitive';
    } else {
      prismaFilter[key] = transformDateField(filter[key], key);
    }
  }

  return prismaFilter;
}

export function transformDateField(value: any, key: string): any {
  if (value instanceof Date && !isUtcMidnight(value)) {
    return value;
  }

  if (value instanceof Date) {
    value = value.toISOString().slice(0, 10);
  }

  if (typeof value !== 'string') return value;

  if (isIsoDateTimeString(value) && !isDateOnlyString(value)) {
    return new Date(value);
  }

  if (!isDateOnlyString(value)) return value;

  const timePart =
    key === 'gte' || key === 'gt' ? 'T00:00:00' : 'T23:59:59.999';
  const localDatetime = `${value}${timePart}`;

  return fromZonedTime(localDatetime, DEFAULT_USER_TIMEZONE);
}

function isUtcMidnight(date: Date): boolean {
  return (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  );
}

function isDateOnlyString(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function isIsoDateTimeString(s: string): boolean {
  return !isNaN(Date.parse(s));
}

export const GraphQLWhere: () => ParameterDecorator = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    const transformedWhere = transformWhere(args.where);

    args.where = transformedWhere;

    return args;
  },
);
