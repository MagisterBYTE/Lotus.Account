import { FunctionHelper, type IRoute, TypedRoute } from 'lotus-core';

/**
 * Маршруты модуля аккаунта
 */
export interface IRoutesAccount
{
  //
  // ОБЩИЕ
  //  
  home: IRoute,

  /**
   * Информация об приложении
   */
  about: IRoute,

  //
  // АВТОРИЗАЦИЯ И РЕГИСТРАЦИЯ
  //
  /**
   * Вход через логин
   */
  login: IRoute,

  /**
   * Зарегистрироваться
   */
  register: IRoute,

  /**
   * Восстановить пароль
   */
  restorePassword: IRoute,

  //
  // АККАУНТ ПОЛЬЗОВАТЕЛЯ
  //
  /**
   * Профиль пользователя
   */
  accountProfile: IRoute,

  /**
   * Настройки пользователя
   */
  accountSettings: IRoute,

  /**
   * Безопасность пользователя
   */
  accountSecurity: IRoute,

  /**
   * Уведомления пользователя
   */
  accountNotifications: IRoute,

  //
  // УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ
  //
  /**
   * Управление пользователями
   */
  users: IRoute,

  /**
   * Управление ролями
   */
  userRoles: IRoute,

  /**
   * Управление разрешениями
   */
  userPermissions: IRoute,

  /**
   * Управление должностями
   */
  userPositions: IRoute,

  /**
   * Управление группами
   */
  userGroups: IRoute
}

/**
 * Класс для определения маршрутов модуля аккаунта
 */
class RoutesAccountClass implements IRoutesAccount
{
  // #region Static fields
  private static _routesAccount: RoutesAccountClass;

  public static get Instance(): RoutesAccountClass 
  {
    return (this._routesAccount || (this._routesAccount = new this()));
  }
  //#endregion

  //#region Fields
  public readonly home = TypedRoute.create('/');
  public readonly about = TypedRoute.create('/about');

  //
  // АВТОРИЗАЦИЯ И РЕГИСТРАЦИЯ
  //
  public readonly login = TypedRoute.create('/auth/login');
  public readonly register = TypedRoute.create('/auth/register');
  public readonly restorePassword = TypedRoute.create('/auth/restorePassword');

  //
  // АККАУНТ ПОЛЬЗОВАТЕЛЯ
  //
  public readonly accountProfile = TypedRoute.create('/account/profile', true);
  public readonly accountSettings = TypedRoute.create('/account/settings', true);
  public readonly accountSecurity = TypedRoute.create('/account/security', true);
  public readonly accountNotifications = TypedRoute.create('/account/notifications', true);

  //
  // УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ
  //
  public readonly users = TypedRoute.create('/users', true);
  public readonly userPermissions = TypedRoute.create('/user/permissions', true);
  public readonly userRoles = TypedRoute.create('/user/roles', true);
  public readonly userPositions = TypedRoute.create('/user/positions', true);
  public readonly userGroups = TypedRoute.create('/user/groups', true);
  //#endregion

  constructor()
  {
    FunctionHelper.bindAllMethods(this);
  }

  //#region Methods

  /**
   * Проверяет, требуется ли авторизация для указанного URI
   * @param uri URI для проверки
   * @returns true если требуется авторизация, false если нет
   */
  public isAuthorizationRequired(uri: string): boolean
  {
    // Нормализуем URI - удаляем начальные и конечные слеши для consistency
    const normalizedUri = uri.replace(/^\/+|\/+$/g, '');

    // Ищем маршрут, который соответствует URI
    const route = this.findRouteByUri(normalizedUri);

    // Если маршрут найден, возвращаем его настройку авторизации
    // Если не найден, по умолчанию требуем авторизацию (безопасный подход)
    return route?.isShouldBeAuthorized ?? false;
  }

  /**
   * Находит маршрут по URI
   * @param uri URI для поиска
   * @returns Найденный маршрут или undefined
   */
  private findRouteByUri(uri: string): IRoute | undefined
  {
    // Проходим по всем полям класса, которые являются маршрутами
    for (const key in this)
    {
      if (this.hasOwnProperty(key))
      {
        const route = this[key] as IRoute;

        // Проверяем, что это объект маршрута и у него есть path
        if (route && typeof route === 'object' && route.path)
        {
          // Нормализуем path маршрута
          const normalizedRoutePath = route.path.replace(/^\/+|\/+$/g, '');

          // Сравниваем URI с path маршрута
          if (normalizedRoutePath === uri)
          {
            return route;
          }

          // Дополнительно: поддержка параметризованных маршрутов
          // Например: /user/:id -> /user/123
          if (this.isParametrizedRouteMatch(normalizedRoutePath, uri))
          {
            return route;
          }
        }
      }
    }

    return undefined;
  }

  /**
   * Проверяет соответствие параметризованного маршрута URI
   * @param routePath Path маршрута (может содержать параметры типа :id)
   * @param uri URI для проверки
   * @returns true если URI соответствует шаблону маршрута
   */
  private isParametrizedRouteMatch(routePath: string, uri: string): boolean
  {
    // Если в routePath есть параметры (например, :id, :userId)
    if (routePath.includes(':'))
    {
      // Заменяем параметры на regex группы
      const regexPattern = routePath.replace(/:[^/]+/g, '([^/]+)');
      const regex = new RegExp(`^${regexPattern}$`);

      return regex.test(uri);
    }

    return false;
  }

  /**
   * Получает все маршруты класса
   * @returns Массив всех маршрутов
   */
  public getAllRoutes(): IRoute[]
  {
    const routes: IRoute[] = [];

    for (const key in this)
    {
      if (this.hasOwnProperty(key))
      {
        const route = this[key] as IRoute;
        if (route && typeof route === 'object' && route.path)
        {
          routes.push(route);
        }
      }
    }

    return routes;
  }

  /**
   * Добавляет новый маршрут (для расширяемости)
   * @param key Ключ маршрута
   * @param route Объект маршрута
   */
  public addRoute(key: string, route: IRoute): void
  {
    // @ts-expect-error
    this[key] = route;
  }

  //#endregion

}

/**
 * Глобальный экземпляр для доступа к маршрутам модуля аккаунта
 */
export const RoutesAccount = RoutesAccountClass.Instance;
