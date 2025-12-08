import { ApiService, FunctionHelper } from 'lotus-core';

/**
 * Класс для сервисов Api приложения 
 */
export class AppApiService extends ApiService 
{
  constructor()
  {
    const baseURL = process.env.PUBLIC_API!;
    super(baseURL);

    FunctionHelper.bindAllMethods(this, ['api']);
  }
}
