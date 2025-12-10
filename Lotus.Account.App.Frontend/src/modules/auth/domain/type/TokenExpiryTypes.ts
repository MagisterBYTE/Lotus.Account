
/**
 * Информация о статус истечения токена
 */
export interface ITokenExpiryDetails 
{
  /** 
   * Истек ли токен
   */
  isExpired: boolean;

  /** 
   * Дата и время истечения
   */
  expiryDate: Date | undefined;

  /** 
   * Оставшееся время в секундах
   */
  remainingSeconds: number;

  /**
   * Оставшееся время в удобном формате
   */
  remainingTime?: string;

  /**
   * Отформатированная информация в разных вариантах
   */
  formatted: ITokenExpiryFormattedInfo;
}

export interface ITokenExpiryFormattedInfo
{
  /** 
   * Короткий формат
   */
  short: string;

  /**
   * Средний формат
   */
  medium: string;

  /**
   * Полный формат
   */
  full: string;
}

