import type { IUserGroup } from '#modules/userGroup';
import type { IUserPermission } from '#modules/userPermission';
import type { IUserPosition } from '#modules/userPosition';
import type { IUserRole } from '#modules/userRole';

/**
 * Интерфейс определяющий минимальную информацию об авторизации пользователя.
 */
export interface IUserAuthorizeInfo
{
  //
  // АУТЕНТИФИКАЦИЯ
  //

  /**
   * Схема авторизации
   */
  authScheme: string;

  /**
   * Дата истечения строка авторизации
   */
  authExpires: Date | string;
  //
  // ИДЕНТИФИКАЦИЯ
  //
  /**
   * Логин пользователя
   */
  login: string;

  /**
   * Почта пользователя
   */
  email: string;

  /** Статус подтверждения почты
   *
   */
  emailConfirmed: boolean;

  /** Статус блокировки пользователя
   *
   */
  isLockout: boolean;

  /** Дата начала блокировки пользователя
   *
   */
  lockoutBeginDate?: Date | string;

  /** Дата окончания блокировки пользователя
   *
   */
  lockoutEndDate?: Date | string;

  //
  // НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ
  //

  /**
   * Настройки пользователя в JSON формате
   * */
  settings?: string;

  //
  // ПЕРСОНАЛЬНЫЕ ДАННЫЕ
  //

  /**
   * Имя пользователя
   */
  name?: string;

  /**
   * Фамилия пользователя
   */
  surname?: string;

  /**
   * Отчество пользователя
   */
  patronymic?: string;

  /**
   * День рождения
   */
  birthday?: string;

  /**
   * Местонахождение пользователя
   */
  whereabouts?: string;

  /**
   * Интересы пользователя
   */
  interests?: string;

  //
  // РОЛЬ И РАЗРЕШЕНИЯ
  //

  /**
   * Роль пользователя
   */
  role: IUserRole;

  /**
   * Список разрешений пользователя.
   */
  permissions: IUserPermission[];

  //
  // ДОЛЖНОСТЬ
  //

  /**
   *  Должность пользователя.
   */
  position: IUserPosition;

  //
  // ГРУППЫ
  //

  /**
   * Список групп пользователя.
   */
  groups: IUserGroup[];

  //
  // АВАТАР
  //

  /**
   * Идентификатор аватара
   */
  avatarId?: string
}
