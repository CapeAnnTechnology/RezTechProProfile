// src/app/auth/auth.config.ts
import { environment } from './../../../environments/environment';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: environment.AUTH0_CLIENT_ID,
  CLIENT_DOMAIN: environment.AUTH0_CLIENT_DOMAIN, // e.g., you.auth0.com
  AUDIENCE: environment.API_URI, // e.g., http://localhost:8083/api/
  REDIRECT: `${environment.BASE_URI}/callback`,
  SCOPE: 'openid profile email',
  NAMESPACE: environment.NAMESPACE
};
