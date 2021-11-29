const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REACT_APP_OKTA_ISSUER = process.env.REACT_APP_OKTA_ISSUER;
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const oktaAuthConfig = {
  issuer: `${REACT_APP_OKTA_ISSUER}`,
  clientId: `${REACT_APP_CLIENT_ID}`,
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "email", "profile"],
  pkce: true,
  disableHttpsCheck: true,
};

const oktaSignInConfig = {
  baseUrl: `${REACT_APP_BASE_URL}`,
  clientId: `${REACT_APP_CLIENT_ID}`,
  redirectUri: window.location.origin + "/login/callback",
  features: { registration: true },
};

export { oktaAuthConfig, oktaSignInConfig };
