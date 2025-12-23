import type { IUserGroup } from "#modules/userGroup";
import type { IUserPermission } from "#modules/userPermission";
import type { IUserPosition } from "#modules/userPosition";
import type { IUserRole } from "#modules/userRole";
import type { IPersonInfo } from "lotus-core/modules/humanizer";
import type { IUserAuthorizeInfo } from "./type";
import { DateTimeConverter } from "lotus-core/converters";
import { Assert } from "lotus-core/utils";

/**
 * Класс, реализующий интерфейс IUserAuthorizeInfo
 */
export class UserAuthorizeInfo implements IUserAuthorizeInfo, IPersonInfo
{
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
  email: string;
  emailConfirmed: boolean;
  isLockout: boolean;
  lockoutBeginDate?: Date;
  lockoutEndDate?: Date;

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
  avatarId?: string
  //#endregion

  // #region Constructors
  /**
   * Конструктор по умолчанию
   */
  constructor();

  /**
   * Конструктор, принимающий IUserAuthorizeInfo
   */
  constructor(info: Partial<IUserAuthorizeInfo>);

  /**
   * Основная реализация конструктора
   */
  constructor(info?: Partial<IUserAuthorizeInfo>)
  {
    // Инициализация с значениями по умолчанию
    this.authScheme = "";
    this.authExpires = new Date();
    this.login = "";
    this.email = "";
    this.emailConfirmed = false;
    this.isLockout = false;
    this.settings = "";
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
  //#endregion

  // #region System methods
  /**
   * Копирует свойства из объекта IUserAuthorizeInfo
   */
  public copyFrom(info: Partial<IUserAuthorizeInfo>): void
  {
    // Аутентификация
    if (Assert.existValue<string>(info.authScheme))
    {
      this.authScheme = info.authScheme;
    }
    if (Assert.existValue<string|Date>(info.authExpires))
    {
      this.authExpires = DateTimeConverter.toDateTime(info.authExpires, undefined);
    }

    // Идентификация
    if (Assert.existValue<string>(info.login)) this.login = info.login;
    if (Assert.existValue<string>(info.email)) this.email = info.email;
    if (Assert.existValue<string>(info.emailConfirmed)) this.emailConfirmed = info.emailConfirmed;
    if (Assert.existValue<string>(info.isLockout)) this.isLockout = info.isLockout;
    if (Assert.existValue<string|Date>(info.lockoutBeginDate))
    {
      this.lockoutBeginDate = DateTimeConverter.toDateTime(info.lockoutBeginDate, undefined);
    }

    if (Assert.existValue<string|Date>(info.lockoutEndDate))
    {
      this.lockoutEndDate = DateTimeConverter.toDateTime(info.lockoutEndDate, undefined);
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
      groups: [...this.groups],
    });
  }
  // #endregion

  // #region IPersonInfo methods
  /**
   * Возвращает полное имя пользователя
   */
  public getFullName(): string
  {
    const parts = [this.surname, this.name, this.patronymic].filter((part) => part && part.trim() !== "");

    return parts.join(" ") || this.login;
  }

  public getInitials(): string
  {
    const n = this.name?.[0]
    const f = this.surname?.[0]
    return `${n}${f}`;
  }
  // #endregion

  /**
   * Создает роль по умолчанию
   */
  private getDefaultRole(): IUserRole
  {
    return {
      id: 0,
      name: "",
      permissionIds: [],
    };
  }

  /**
   * Создает должность по умолчанию
   */
  private getDefaultPosition(): IUserPosition
  {
    return {
      id: 0,
      name: "",
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
  toJSON(): string
  {
    return JSON.stringify({
      authScheme: this.authScheme,
      authExpires: this.authExpires.toISOString(),
      login: this.login,
      email: this.email,
      emailConfirmed: this.emailConfirmed,
      isLockout: this.isLockout,
      lockoutBeginDate: this.lockoutBeginDate?.toISOString(),
      lockoutEndDate: this.lockoutEndDate?.toISOString(),
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
      groups: this.groups,
    });
  }

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
        lockoutEndDate: data.lockoutEndDate ? new Date(data.lockoutEndDate) : undefined,
      });
    } catch (error)
    {
      console.error("Ошибка при парсинге JSON:", error);
      return new UserAuthorizeInfo();
    }
  }
}
