import { ENV_VARIABLES_SCHEMA } from '@/shared/config/models/env-variables.model';

export function validate(config: Record<string, unknown>) {
  const parsed = ENV_VARIABLES_SCHEMA.safeParse(config);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues
      .map(
        (e) =>
          `❌ Missing or invalid env var "${e.path.join('.')}" → ${e.message}`,
      )
      .join('\n');

    throw new Error(`Environment validation failed:\n${errorMessages}`);
  }

  return parsed.data;
}
