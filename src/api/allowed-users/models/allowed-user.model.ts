import type { GlobalRole } from '@prisma/xxx-client';

export class AllowedUser {
  id?: bigint;
  email?: string;
  globalRole?: GlobalRole;
  createdAt?: Date;
}
