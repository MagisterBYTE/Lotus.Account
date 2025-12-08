import { PermissionsAccountConstants, RoutesAccount } from "#app";
import { LocalizationAccount } from "#localization";
import { AuthCommands, AuthService } from "#modules/auth";
import { AppShell, Avatar, Burger, Group, Menu, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import * as React from "react";
import { type ReactElement } from "react";
import { FaPeopleGroup, FaUsers } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import { LayoutService } from "../LayoutService";
import { ActionCommand, DelimiterCommand } from "lotus-core/modules/actionCommand";
import { AccountCommands } from "../../modules/account";
import { CommandElement } from "lotus-ui-react/modules/commands";
import { IconHome, IconInfoSquareRounded } from "@tabler/icons-react";

export interface IMainLayoutProps
{
  page: ReactElement;
}

export const MainLayout: React.FC<IMainLayoutProps> = (props: IMainLayoutProps) =>
{
  const { page } = props;

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const layoutState = LayoutService.layoutState;
  const visibleHeader = layoutState.header.isVisibleUser && layoutState.header.isVisible;
  const isAuth = AuthService.isAuth;
  const tokenService = AuthService.tokenService;

  const location = useLocation();
  const navigate = useNavigate();

  const renderBaseNavigation = () => 
  {
    return <>
            <NavLink
            onClick={() =>
            {
              navigate(RoutesAccount.home.path);
            }}
            label={'Home'}
            leftSection={<IconHome />}
            active={location.pathname === RoutesAccount.home.path}
            variant="light"
          />
                      <NavLink
            onClick={() =>
            {
              navigate(RoutesAccount.about.path);
            }}
            label={'About'}
            leftSection={<IconInfoSquareRounded />}
            active={location.pathname === RoutesAccount.about.path}
            variant="light"
          />
    </>
  }

  const renderLeftNavbar = () =>
  {
    return (
      <>
        {/* // Пользователи */}
        {tokenService.checkUserPermission(PermissionsAccountConstants.UserView) && (
          <NavLink
            variant="light"
            onClick={() =>
            {
              navigate(RoutesAccount.users.path);
            }}
            label={LocalizationAccount.data.user.users}
            active={location.pathname === RoutesAccount.users.path}
            leftSection={<FaUsers />}
          />
        )}
        {tokenService.checkUserPermission(PermissionsAccountConstants.PermissionView) && (
          <NavLink
            onClick={() =>
            {
              navigate(RoutesAccount.userPermissions.path);
            }}
            label={LocalizationAccount.data.permission.permissions}
            leftSection={<FaUsers />}
            active={location.pathname === RoutesAccount.userPermissions.path}
            variant="light"
          />
        )}
        {tokenService.checkUserPermission(PermissionsAccountConstants.RoleView) && (
          <NavLink
            onClick={() =>
            {
              navigate(RoutesAccount.userRoles.path);
            }}
            label={LocalizationAccount.data.role.roles}
            leftSection={<FaUsers />}
            active={location.pathname === RoutesAccount.userRoles.path}
            variant="light"
          />
        )}
        {tokenService.checkUserPermission(PermissionsAccountConstants.PositionView) && (
          <NavLink
            onClick={() =>
            {
              navigate(RoutesAccount.userPositions.path);
            }}
            label={LocalizationAccount.data.position.positions}
            leftSection={<FaUsers />}
            active={location.pathname === RoutesAccount.userPositions.path}
            variant="light"
          />
        )}
        {tokenService.checkUserPermission(PermissionsAccountConstants.GroupView) && (
          <NavLink
            onClick={() =>
            {
              navigate(RoutesAccount.userGroups.path);
            }}
            label={LocalizationAccount.data.group.groups}
            leftSection={<FaPeopleGroup />}
            active={location.pathname === RoutesAccount.userGroups.path}
            variant="light"
          />
        )}


        {renderBaseNavigation()}
      </>
    );
  };

  const accountMenu:ActionCommand[] = [
    AccountCommands.profile, 
    AccountCommands.settings, 
    AccountCommands.security,
    DelimiterCommand.Instance, 
    AuthCommands.logout]

  const renderAccount = () =>
  {
    if(!isAuth) return <></>
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
        <Avatar src={null} size={'md'} alt="no image here" />
        </Menu.Target>
        <Menu.Dropdown>
          {accountMenu.map((item, index) =>
          {
            return <CommandElement key={index} command={item} size={'md'} elementType="menuItem"/>
          })}
        </Menu.Dropdown>
      </Menu>
    );
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      {/* Заголовок */}
      {
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            {renderAccount()}
          </Group>
        </AppShell.Header>
      }

      <AppShell.Navbar p="md">{renderLeftNavbar()}</AppShell.Navbar>
      <AppShell.Main>{page}</AppShell.Main>
    </AppShell>
  );
};
