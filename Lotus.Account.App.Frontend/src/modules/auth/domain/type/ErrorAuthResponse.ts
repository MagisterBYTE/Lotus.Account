/**
 *  Ответ в случаи неуспешного получения токена
 */
export interface IErrorAuthResponse 
{
  error: string;
  error_description: string;
  error_uri: string;
}

/**
 * Проверка объекта на поддержку интерфейса IErrorAuthResponse
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const instanceOfErrorAuthResponse = (value: any): value is IErrorAuthResponse =>
{
  if (value && typeof value === 'object')
  {
    return ('error' in value) && ('error_description' in value);
  }

  return false;
};

/**
 * Преобразование объекта к интерфейсу IErrorAuthResponse 
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const castToErrorAuthResponse = (value: any): IErrorAuthResponse | undefined =>
{
  if (instanceOfErrorAuthResponse(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
};
