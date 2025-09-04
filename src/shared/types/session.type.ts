import type { AuthUser } from '@/shared/auth/models/auth-user.model';
import type { SessionContainer } from 'supertokens-node/recipe/session';

export interface SessionWithMetadata extends SessionContainer {
  metadata: AuthUser;
}
