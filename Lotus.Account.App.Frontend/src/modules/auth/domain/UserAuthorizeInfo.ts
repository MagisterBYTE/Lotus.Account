import { DateTimeConverter } from 'lotus-core/converters';
import { HumanizerPerson, type IPersonInfo } from 'lotus-core/modules/humanizer';
import { RefreshProxy } from 'lotus-core/modules/refreshProxy';
import { Assert } from 'lotus-core/utils';
import type { IUserGroup } from '#modules/userGroup';
import type { IUserPermission } from '#modules/userPermission';
import type { IUserPosition } from '#modules/userPosition';
import type { IUserRole } from '#modules/userRole';
import type { IUserAuthorizeInfo } from './type';

/**
 * Класс, реализующий интерфейс IUserAuthorizeInfo
 */
export class UserAuthorizeInfo extends RefreshProxy implements IUserAuthorizeInfo, IPersonInfo
{
  // #region Static methods
  /**
   * Создает экземпляр класса из JSON строки
   */
  static fromJSON(jsonString: string): UserAuthorizeInfo
  {
    try
    {
      const data = JSON.parse(jsonString);
      return new UserAuthorizeInfo({
        ...data,
        authExpires: data.authExpires ? new Date(data.authExpires) : undefined,
        lockoutBeginDate: data.lockoutBeginDate ? new Date(data.lockoutBeginDate) : undefined,
        lockoutEndDate: data.lockoutEndDate ? new Date(data.lockoutEndDate) : undefined
      });
    }
    catch (error)
    {
      console.error('Ошибка при парсинге JSON:', error);
      return new UserAuthorizeInfo();
    }
  }
  // #endregion

  // #region Fields
  //
  // АУТЕНТИФИКАЦИЯ
  //
  authScheme: string;
  authExpires: Date;

  //
  // ИДЕНТИФИКАЦИЯ
  //
  login: string;
  nickname: string;
  email: string;
  emailConfirmed: boolean;
  isLockout: boolean;
  lockoutBeginDate?: Date;
  lockoutEndDate?: Date;
  hashId: string;

  //
  // НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ
  //
  settings?: string;

  //
  // ПЕРСОНАЛЬНЫЕ ДАННЫЕ
  //
  name?: string;
  surname?: string;
  patronymic?: string;
  birthday?: string;
  whereabouts?: string;
  interests?: string;

  //
  // РОЛЬ И РАЗРЕШЕНИЯ
  //
  role: IUserRole;
  permissions: IUserPermission[];

  //
  // ДОЛЖНОСТЬ
  //
  position: IUserPosition;

  //
  // ГРУППЫ
  //
  groups: IUserGroup[];

  //
  // АВАТАР
  //
  avatarId?: string;
  // #endregion

  // #region Constructors
  /**
   * Основная реализация конструктора
   */
  constructor(info?: Partial<IUserAuthorizeInfo>)
  {
    super();

    // Инициализация с значениями по умолчанию
    this.authScheme = '';
    this.authExpires = new Date();
    this.login = '';
    this.nickname = '';
    this.email = '';
    this.emailConfirmed = false;
    this.isLockout = false;
    this.hashId = '';
    this.settings = '';
    this.role = this.getDefaultRole();
    this.permissions = [];
    this.position = this.getDefaultPosition();
    this.groups = [];

    // Если передан объект, копируем его свойства
    if (info)
    {
      this.copyFrom(info);
    }
  }
  // #endregion

  // #region System methods
  /**
   * Копирует свойства из объекта IUserAuthorizeInfo
   */
  // eslint-disable-next-line complexity
  public copyFrom(info: Partial<IUserAuthorizeInfo>): void
  {
    // Аутентификация
    if (Assert.existValue<string>(info.authScheme))
    {
      this.authScheme = info.authScheme;
    }
    if (Assert.existValue<string | Date>(info.authExpires))
    {
      this.authExpires = DateTimeConverter.toDateTime(info.authExpires, undefined);
    }

    // Идентификация
    if (Assert.existValue<string>(info.login)) this.login = info.login;
    if (Assert.existValue<string>(info.nickname)) this.nickname = info.nickname;
    if (Assert.existValue<string>(info.email)) this.email = info.email;
    if (Assert.existValue<string>(info.emailConfirmed)) this.emailConfirmed = info.emailConfirmed;
    if (Assert.existValue<string>(info.isLockout)) this.isLockout = info.isLockout;
    if (Assert.existValue<string | Date>(info.lockoutBeginDate))
    {
      this.lockoutBeginDate = DateTimeConverter.toDateTime(info.lockoutBeginDate, undefined);
    }

    if (Assert.existValue<string | Date>(info.lockoutEndDate))
    {
      this.lockoutEndDate = DateTimeConverter.toDateTime(info.lockoutEndDate, undefined);
    }
    if (Assert.existValue<string>(info.hashId))
    {
      this.hashId = info.hashId;
    }

    // Настройки
    if (Assert.existValue<string>(info.settings)) this.settings = info.settings;

    // Персональные данные
    if (Assert.existValue<string>(info.name)) this.name = info.name;
    if (Assert.existValue<string>(info.surname)) this.surname = info.surname;
    if (Assert.existValue<string>(info.patronymic)) this.patronymic = info.patronymic;
    if (Assert.existValue<string>(info.birthday)) this.birthday = info.birthday;
    if (Assert.existValue<string>(info.whereabouts)) this.whereabouts = info.whereabouts;
    if (Assert.existValue<string>(info.interests)) this.interests = info.interests;

    // Роль и разрешения
    if (Assert.existValue<IUserRole>(info.role)) this.role = info.role;
    if (Assert.existValue<IUserPermission[]>(info.permissions)) this.permissions = [...info.permissions];

    // Должность
    if (Assert.existValue<IUserPosition>(info.position)) this.position = { ...info.position };

    // Группы
    if (Assert.existValue<IUserGroup[]>(info.groups)) this.groups = [...info.groups];
  }

  /**
   * Создает копию объекта
   */
  public clone(): UserAuthorizeInfo
  {
    return new UserAuthorizeInfo({
      authScheme: this.authScheme,
      authExpires: new Date(this.authExpires),
      login: this.login,
      email: this.email,
      emailConfirmed: this.emailConfirmed,
      isLockout: this.isLockout,
      lockoutBeginDate: this.lockoutBeginDate ? new Date(this.lockoutBeginDate) : undefined,
      lockoutEndDate: this.lockoutEndDate ? new Date(this.lockoutEndDate) : undefined,
      settings: this.settings,
      name: this.name,
      surname: this.surname,
      patronymic: this.patronymic,
      birthday: this.birthday,
      whereabouts: this.whereabouts,
      interests: this.interests,
      role: { ...this.role },
      permissions: [...this.permissions],
      position: { ...this.position },
      groups: [...this.groups]
    });
  }
  // #endregion

  // #region Common methods
  /**
   * Создает роль по умолчанию
   */
  private getDefaultRole(): IUserRole
  {
    return {
      id: 0,
      name: '',
      permissionIds: []
    };
  }

  /**
   * Создает должность по умолчанию
   */
  private getDefaultPosition(): IUserPosition
  {
    return {
      id: 0,
      name: ''
    };
  }

  /**
   * Проверяет, действительна ли авторизация
   */
  public isAuthValid(): boolean
  {
    if (Assert.emptyValue(this.authScheme))
    {
      return false;
    }

    // Проверяем срок действия
    const now = new Date();
    return this.authExpires > now && !this.isLockedOut();
  }

  /**
   * Проверяет, заблокирован ли пользователь
   */
  public isLockedOut(): boolean
  {
    if (!this.isLockout)
    {
      return false;
    }

    // Если есть дата окончания блокировки, проверяем её
    if (this.lockoutEndDate)
    {
      const now = new Date();
      return now < this.lockoutEndDate;
    }

    // Если даты окончания нет, но isLockout = true, пользователь заблокирован навсегда
    return true;
  }

  /**
   * Проверяет, имеет ли пользователь указанное разрешение
   * @param permissionName Имя разрешения
   * @returns Статус проверки
   */
  public hasPermissionByName(permissionName: string): boolean
  {
    return this.permissions.some((p) => p.name === permissionName);
  }

  /**
   * Проверяет, находится ли пользователь в указанной группе
   * @param groupId Идентификатор группы
   * @returns Статус проверки
   */
  public isInGroupById(groupId: number): boolean
  {
    return this.groups.some((g) => g.id === groupId);
  }

  /**
   * Сериализует объект в JSON строку
   */
  public toJSON(): string
  {
    const userInfo = this.toUserAuthorizeInfo();
    return JSON.stringify(userInfo);
  }

  public toUserAuthorizeInfo():IUserAuthorizeInfo
  {
    return {
      authScheme: this.authScheme,
      authExpires: this.authExpires.toISOString(),
      login: this.login,
      nickname: this.nickname,
      email: this.email,
      emailConfirmed: this.emailConfirmed,
      isLockout: this.isLockout,
      lockoutBeginDate: this.lockoutBeginDate?.toISOString(),
      lockoutEndDate: this.lockoutEndDate?.toISOString(),
      hashId: this.hashId,
      settings: this.settings,
      name: this.name,
      surname: this.surname,
      patronymic: this.patronymic,
      birthday: this.birthday,
      whereabouts: this.whereabouts,
      interests: this.interests,
      role: this.role,
      permissions: this.permissions,
      position: this.position,
      groups: this.groups
    };
  }
  // #endregion

  // #region Update methods
  public setNickname(nickname: string, isRefreshProxy: boolean = true): void
  {
    this.nickname = nickname;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setEmail(email: string, isRefreshProxy: boolean = true): void
  {
    this.email = email;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setName(name: string, isRefreshProxy: boolean = true): void
  {
    this.name = name;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setSurname(surname: string, isRefreshProxy: boolean = true): void
  {
    this.surname = surname;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setPatronymic(patronymic: string, isRefreshProxy: boolean = true): void
  {
    this.patronymic = patronymic;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setBirthday(birthday: string, isRefreshProxy: boolean = true): void
  {
    this.birthday = birthday;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setWhereabouts(whereabouts: string, isRefreshProxy: boolean = true): void
  {
    this.whereabouts = whereabouts;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setInterests(interests: string, isRefreshProxy: boolean = true): void
  {
    this.interests = interests;
    if (isRefreshProxy) this.onRefreshProxy();
  }
  // #endregion

  // #region IPersonInfo methods
  /**
   * Возвращает отображаемое имя в неформальном стиле
   */
  public getDisplayName(): string
  {
    return HumanizerPerson.getDisplayName(this);
  }

  /**
   * Возвращает полное имя пользователя
   */
  public getFullName(): string
  {
    return HumanizerPerson.getFullName(this);
  }

  /**
   * Возвращает инициалы пользователя
   */
  public getInitials(): string
  {
    return HumanizerPerson.getInitials(this);
  }
  // #endregion
}
