import { RoutesAccount } from "#app";
import
  {
    AboutPage,
    AccountNotificationsPage,
    AccountProfilePage,
    AccountSecurityPage,
    AccountSettingsPage,
    AutoLoginPage,
    HomePage,
    LoginPage,
    UserGroupsPage,
    UserPermissionsPage,
    UserPositionsPage,
    UserRolesPage,
    UsersPage,
  } from "#pages";
import React from "react";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router";
import { RegistrationPage } from "./pages/Auth/RegistrationPage";
import { MainLayout } from "#layout";

// Определяем маршруты как RouteObject[]
export const routes: RouteObject[] = [
  //
  // Общие маршруты
  //
  { path: RoutesAccount.home.path, element: <MainLayout page={<HomePage />} /> },
  { path: RoutesAccount.about.path, element: <MainLayout page={<AboutPage />} /> },

  //
  // Авторизация и регистрация
  //
  { path: RoutesAccount.entrance.path, element: <LoginPage pathSuccess={RoutesAccount.home.path} /> },
  { path: RoutesAccount.login.path, element: <LoginPage pathSuccess={RoutesAccount.home.path} /> },
  { path: RoutesAccount.autoLogin.path, element: <AutoLoginPage pathSuccess={RoutesAccount.home.path} /> },
  { path: RoutesAccount.register.path, element: <RegistrationPage pathSuccess={RoutesAccount.home.path} /> },
  /* { path: RoutesAccount.restorePassword.path, element: <RestorePasswordPage pathSuccess={RoutesAccount.login.path} /> }, */

  //
  // Личные страницы пользователя
  //
  { path: RoutesAccount.accountProfile.path, element: <MainLayout {...RoutesAccount.accountProfile} page={<AccountProfilePage />} /> },
  { path: RoutesAccount.accountSettings.path, element: <MainLayout {...RoutesAccount.accountSettings} page={<AccountSettingsPage />} /> },
  { path: RoutesAccount.accountSecurity.path, element: <MainLayout {...RoutesAccount.accountSecurity} page={<AccountSecurityPage />} /> },
  { path: RoutesAccount.accountNotifications.path, element: <MainLayout {...RoutesAccount.accountNotifications} page={<AccountNotificationsPage />} /> },

  //
  // Управление пользователями
  //
  { path: RoutesAccount.users.path, element: <MainLayout {...RoutesAccount.users} page={<UsersPage />} /> },
  { path: RoutesAccount.userPermissions.path, element: <MainLayout {...RoutesAccount.userPermissions} page={<UserPermissionsPage />} /> },
  { path: RoutesAccount.userRoles.path, element: <MainLayout {...RoutesAccount.userRoles} page={<UserRolesPage />} /> },
  { path: RoutesAccount.userPositions.path, element: <MainLayout {...RoutesAccount.userPositions} page={<UserPositionsPage />} /> },
  { path: RoutesAccount.userGroups.path, element: <MainLayout {...RoutesAccount.userGroups} page={<UserGroupsPage />} /> },
];

// Создаем роутер
export const router = createBrowserRouter(routes);

// Компонент App с RouterProvider
export const App: React.FC = () =>
{
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
};
