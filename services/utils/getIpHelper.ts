export const getIpFromRequest = (request: Request): string | null => {
  const token = request.headers['authorization'] as string | undefined;

  if (!token || !token.startsWith('Bearer ')) {
    return null;
  }

  return token.slice(7);
};
