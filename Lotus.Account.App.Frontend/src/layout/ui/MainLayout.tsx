import { PermissionsAccountConstants, RoutesAccount, theme } from "#app";
import { LocalizationAccount } from "#localization";
import { AuthCommands, AuthService } from "#modules/auth";
import { AppShell, Avatar, Burger, Group, Menu, NavLink, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import * as React from "react";
import { useEffect, type ReactElement } from "react";
import { FaPeopleGroup, FaUsers } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import { LayoutService } from "../LayoutService";
import { ActionCommand, DelimiterCommand } from "lotus-core/modules/actionCommand";
import { AccountCommands } from "../../modules/account";
import { CommandElement } from "lotus-ui-react/modules/commands";
import { IconBrandBitbucket, IconDrone, IconHome, IconInfoSquareRounded, IconLicense, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { useAuthContext } from "../../provider/auth";
import { Environment } from "lotus-core/environment";

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
  const { userAuthInfo } = useAuthContext();

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
        {userAuthInfo?.hasPermissionByName(PermissionsAccountConstants.UserView) && (
          <NavLink
            variant="light"
            onClick={() =>
            {
              navigate(RoutesAccount.users.path);
            }}
            label={LocalizationAccount.data.user.users}
            active={location.pathname === RoutesAccount.users.path}
            leftSection={<IconUsers color={theme.colors!.green![2]} />}
          />
        )}
        {userAuthInfo?.hasPermissionByName(PermissionsAccountConstants.PermissionView) && (
          <NavLink
            onClick={() =>
            {
              navigate(RoutesAccount.userPermissions.path);
            }}
            label={LocalizationAccount.data.permission.permissions}
            leftSection={<IconLicense color={theme.colors!.info![2]} />}
            active={location.pathname === RoutesAccount.userPermissions.path}
            variant="light"
          />
        )}
        {userAuthInfo?.hasPermissionByName(PermissionsAccountConstants.RoleView) && (
          <NavLink
            onClick={() =>
            {
              navigate(RoutesAccount.userRoles.path);
            }}
            label={LocalizationAccount.data.role.roles}
            leftSection={<IconDrone />}
            active={location.pathname === RoutesAccount.userRoles.path}
            variant="light"
          />
        )}
        {userAuthInfo?.hasPermissionByName(PermissionsAccountConstants.PositionView) && (
          <NavLink
            onClick={() =>
            {
              navigate(RoutesAccount.userPositions.path);
            }}
            label={LocalizationAccount.data.position.positions}
            leftSection={<IconBrandBitbucket />}
            active={location.pathname === RoutesAccount.userPositions.path}
            variant="light"
          />
        )}
        {userAuthInfo?.hasPermissionByName(PermissionsAccountConstants.GroupView) && (
          <NavLink
            onClick={() =>
            {
              navigate(RoutesAccount.userGroups.path);
            }}
            label={LocalizationAccount.data.group.groups}
            leftSection={<IconUsersGroup />}
            active={location.pathname === RoutesAccount.userGroups.path}
            variant="light"
          />
        )}

        {renderBaseNavigation()}
      </>
    );
  };

  const accountMenu: ActionCommand[] = [
    AccountCommands.profile,
    AccountCommands.settings,
    AccountCommands.security,
    DelimiterCommand.Instance,
    AuthCommands.logout]

  const renderAccount = () =>
  {
    if (!userAuthInfo) return <></>
    return (
      <>
                <img 
                  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
                src={userAuthInfo.avatarId} />
      
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Avatar src={userAuthInfo.avatarId} size={'md'} alt="no image here" name={userAuthInfo.getInitials()} color="initials" />
        </Menu.Target>
        <Menu.Dropdown>
          {accountMenu.map((item, index) =>
          {
            return <CommandElement key={index} command={item} size={'md'} elementType="menuItem" />
          })}
        </Menu.Dropdown>
      </Menu></>
    );
  };

  return (
    <AppShell
          transitionDuration={500}
      transitionTimingFunction="ease-in-out"
      padding="md"
      layout="default"
header={{ height: { base: 48, sm: 60, lg: 76 } }}
      footer={{ height: 60, collapsed: true }}
      navbar={{
        width: 400,
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
            {userAuthInfo && userAuthInfo.name}
            {renderAccount()}
          </Group>
        </AppShell.Header>
      }

      <AppShell.Navbar p="md">{renderLeftNavbar()}</AppShell.Navbar>
      <AppShell.Main>{page}</AppShell.Main>
      <AppShell.Footer></AppShell.Footer>
    </AppShell>
  );
};
