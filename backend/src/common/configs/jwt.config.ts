export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'super-secret-key',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'super-refresh-secret-key',
  expiresIn: '15m',
  refreshExpiresIn: '7d',
} as const;

if (process.env.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT Secrets MUST be configured in production!');
  }
}
