import { Environment, type TEnvironmentType } from 'lotus-core/environment';

// Инициализируем в самом начале
Environment.init({
  type: import.meta.env.MODE as TEnvironmentType,
  version: import.meta.env.PUBLIC_VERSION,
  buildId: import.meta.env.PUBLIC_BUILD_ID,
  features: {
    cookieAuth: import.meta.env.PUBLIC_AUTH_COOKIE ?? '',
    tokenAuth: import.meta.env.PUBLIC_TOKEN_COOKIE ?? '',
    frontApi: import.meta.env.PUBLIC_FRONT_API ?? '',
    backendApi: import.meta.env.PUBLIC_BACKEND_API ?? ''
  }
});