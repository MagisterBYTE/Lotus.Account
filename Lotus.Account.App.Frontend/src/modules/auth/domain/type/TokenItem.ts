
/**
 * Перечисление для типа данных токена для хранения в локальном хранилище
 */
export const TokenItemEnum =
  {

    /**
     * Токен доступа
     */
    AccessToken: 'AccessToken',

    /**
     * Токен Refresh
     */
    RefreshToken: 'RefreshToken',

    /**
     * Дата истечения токена доступа
     */
    ExpiresIn: 'ExpiresIn',

    /**
     * Логин пользователя (стандартное поле name)
     */
    Login: 'UserLogin',

    /**
     * Роль пользователя (стандартное поле role)
     */
    Role: 'UserRole',

    /**
     * Почта пользователя (стандартное поле email)
     */
    Email: 'UserEmail',

    /**
     * Имя пользователя (пользовательское поле user_name)
     */
    UserName: 'UserName',

    /**
     * Разрешения пользователя (пользовательское поле user_permissions)
     */
    UserPermissions: 'UserPermissions'
  } as const;

/**
 * Тип данных токена для хранения в локальном хранилище
 */
export type TTokenItem = keyof typeof TokenItemEnum;
