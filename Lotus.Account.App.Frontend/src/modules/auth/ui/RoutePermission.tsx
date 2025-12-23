import { RoutesAccount } from '#app';
import { LocalizationAccount } from '#localization';
import { type ReactElement } from 'react';
import { Navigate, useLocation } from "react-router";
import { AuthService } from '../AuthService';

export interface IRouteUserPermissionProps
{
  /**
   * Компонент для отображения в случае успешного доступа
   */
  component: ReactElement;

  /**
   * Компонент для отображения в случае недостаточности прав
   */
  accessDenied?: ReactElement;

  /**
   * Набор разрешений для доступа по данному маршруту
   */
  permissions?: string[];

  /**
   * Должен ли он быть пользователь авторизован для доступа по данному маршруту
   */
  isShouldBeAuthorized?: boolean;
};

export const RoutePermission = (props: IRouteUserPermissionProps): ReactElement =>
{
  const { component, accessDenied, permissions, isShouldBeAuthorized } = props;

  const tokenService =  AuthService.tokenService;
  const isAuth = tokenService.hasAccessToken();
  const location = useLocation();

  const state = location.state as { from: Location };
  const prevPageUrl = state ? state.from.pathname : '/';

  // Пользователь должен быть авторизован
  if (isShouldBeAuthorized)
  {
    // Если он авторизован
    if (isAuth)
    {
      // Если нужен доступ
      if (permissions)
      {
        // Проверяем права
        if (tokenService.checkUserPermissions(permissions))
        {
          // Права нужные есть
          return component;
        }
        else
        {
          // Доступа нет, возвращаем страницу профиля
          return accessDenied ?? <>{LocalizationAccount.data.auth.accessDenied}</>;
        }
      }
      else
      {
        // Доступ к ресурсу не нужен
        return component;
      }
    }
    else
    {
        // Пользователь не авторизован - возвращаем страницу авторизации
        return <Navigate to={RoutesAccount.login.path} state={{ from: location }} />
    }
  }
  else
  {
    // Он авторизован, но не должен быть
    if (isAuth)
    {
      // Переходим на предыдущую страницу
      return <Navigate to={prevPageUrl} state={{ from: location }} />
    }
    else
    {
      return component;
    }
  }
}
