/**
 *  Ответ в случаи успешного получения токена
 */
export interface ISuccessAuthResponse 
{
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

/**
 * Проверка объекта на поддержку интерфейса ISuccessAuthResponse
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const instanceOfSuccessAuthResponse = (value: any): value is ISuccessAuthResponse =>
{
  if (value && typeof value === 'object')
  {
    const accessToken = ('access_token' in value);
    const expiresIn = ('expires_in' in value);
    const refreshToken = ('refresh_token' in value);

    return accessToken && expiresIn && refreshToken;
  }

  return false;
};

/**
 * Преобразование объекта к интерфейсу ISuccessAuthResponse 
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const castToSuccessAuthResponse = (value: any): ISuccessAuthResponse | undefined =>
{
  if (instanceOfSuccessAuthResponse(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
};