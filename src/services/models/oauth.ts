/**
 * Configuration.
 */

export const config: any = {
  clients: [
    {
      id: 'application', // TODO: Needed by refresh_token grant, because there is a bug at line 103 in https://github.com/oauthjs/node-oauth2-server/blob/v3.0.1/lib/grant-types/refresh-token-grant-type.js (used client.id instead of client.clientId)
      clientId: 'application',
      clientSecret: 'secret',
      grants: ['password', 'refresh_token'],
      redirectUris: [],
    },
  ],
  tokens: [],
  users: [
    {
      username: 'blanca94',
      password: 'password',
    },
  ],
};

export const getAccessToken = function (token: string) {
  const tokens = config.tokens.filter(function (savedToken: any) {
    return savedToken.accessToken === token;
  });
  return tokens[0];
};

export const getClient = function (clientId: string, clientSecret: string) {
  const clients = config.clients.filter(function (client: Record<string, any>) {
    return client.clientId === clientId && client.clientSecret === clientSecret;
  });
  return clients[0];
};

export const saveToken = function (
  token: Record<string, any>,
  client: Record<string, any>,
  user: Record<string, any>
) {
  token.client = {
    id: client.clientId,
  };
  token.user = {
    username: user.username,
  };
  config.tokens.push(token);
  return token;
};

export const getUser = function (username: string, password: string) {
  const users = config.users.filter(function (user: Record<string, any>) {
    return user.username === username && user.password === password;
  });
  return users[0];
};

export const getRefreshToken = function (refreshToken: string) {
  const tokens = config.tokens.filter(function (
    savedToken: Record<string, any>
  ) {
    return savedToken.refreshToken === refreshToken;
  });
  if (!tokens.length) {
    return;
  }
  return tokens[0];
};

export const revokeToken = function (token: Record<string, any>) {
  config.tokens = config.tokens.filter(function (
    savedToken: Record<string, any>
  ) {
    return savedToken.refreshToken !== token.refreshToken;
  });
  const revokedTokensFound = config.tokens.filter(function (
    savedToken: Record<string, any>
  ) {
    return savedToken.refreshToken === token.refreshToken;
  });
  return !revokedTokensFound.length;
};

export default {
  getAccessToken,
  getClient,
  saveToken,
  getUser,
  getRefreshToken,
  revokeToken,
};
