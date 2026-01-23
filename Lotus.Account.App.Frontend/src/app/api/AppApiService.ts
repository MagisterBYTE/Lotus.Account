import { ApiService, Environment } from 'lotus-core';

/**
 * Класс для сервисов Api приложения 
 */
export class AppApiService extends ApiService 
{
  constructor()
  {
    const baseURL = Environment.backendApi;
    super(baseURL);
  }
}
