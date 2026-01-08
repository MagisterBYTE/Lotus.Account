import { AppShell, Avatar, Burger, Group, Menu, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandBitbucket, IconDrone, IconHome, IconInfoSquareRounded, IconLicense, IconUsers, IconUsersGroup } from '@tabler/icons-react';
import { ActionCommand, DelimiterCommand } from 'lotus-core/modules/actionCommand';
import { CommandElement } from 'lotus-ui-react/modules/commands';
import * as React from 'react';
import { type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PermissionsAccountConstants, RoutesAccount, theme } from '#app';
import { LocalizationAccount } from '#localization';
import { AuthCommands } from '#modules/auth';
import { AccountCommands } from '../../modules/account';
import { useAuthContext } from '../../provider/auth';

export interface IMainLayoutProps
{
  page: ReactElement;
}


export const MainLayout: React.FC<IMainLayoutProps> = (props: IMainLayoutProps) =>
{
  const { page } = props;

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  // const layoutState = LayoutService.layoutState;
  const { userAuthInfo } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  const renderBaseNavigation = () => 
  {
    return (<>
      <NavLink
        active={location.pathname === RoutesAccount.home.path}
        label={'Home'}
        leftSection={<IconHome />}
        variant="light"
        onClick={() =>
        {
          void navigate(RoutesAccount.home.path);
        }}
      />
      <NavLink
        active={location.pathname === RoutesAccount.about.path}
        label={'About'}
        leftSection={<IconInfoSquareRounded />}
        variant="light"
        onClick={() =>
        {
          void navigate(RoutesAccount.about.path);
        }}
      />
    </>);
  };

  const renderLeftNavbar = () =>
  {
    return (
      <>
        {/* // Пользователи */}
        {userAuthInfo?.hasPermissionByName(PermissionsAccountConstants.UserView) && (
          <NavLink
            active={location.pathname === RoutesAccount.users.path}
            label={LocalizationAccount.data.user.users}
            leftSection={<IconUsers color={theme.colors!.green![2]} />}
            variant="light"
            onClick={() =>
            {
              void navigate(RoutesAccount.users.path);
            }}
          />
        )}
        {userAuthInfo?.hasPermissionByName(PermissionsAccountConstants.PermissionView) && (
          <NavLink
            active={location.pathname === RoutesAccount.userPermissions.path}
            label={LocalizationAccount.data.permission.permissions}
            leftSection={<IconLicense color={theme.colors!.info![2]} />}
            variant="light"
            onClick={() =>
            {
              void navigate(RoutesAccount.userPermissions.path);
            }}
          />
        )}
        {userAuthInfo?.hasPermissionByName(PermissionsAccountConstants.RoleView) && (
          <NavLink
            active={location.pathname === RoutesAccount.userRoles.path}
            label={LocalizationAccount.data.role.roles}
            leftSection={<IconDrone />}
            variant="light"
            onClick={() =>
            {
              void navigate(RoutesAccount.userRoles.path);
            }}
          />
        )}
        {userAuthInfo?.hasPermissionByName(PermissionsAccountConstants.PositionView) && (
          <NavLink
            active={location.pathname === RoutesAccount.userPositions.path}
            label={LocalizationAccount.data.position.positions}
            leftSection={<IconBrandBitbucket />}
            variant="light"
            onClick={() =>
            {
              void navigate(RoutesAccount.userPositions.path);
            }}
          />
        )}
        {userAuthInfo?.hasPermissionByName(PermissionsAccountConstants.GroupView) && (
          <NavLink
            active={location.pathname === RoutesAccount.userGroups.path}
            label={LocalizationAccount.data.group.groups}
            leftSection={<IconUsersGroup />}
            variant="light"
            onClick={() =>
            {
              void navigate(RoutesAccount.userGroups.path);
            }}
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
    AuthCommands.logout];

  const renderAccount = () =>
  {
    if (!userAuthInfo) return <></>;
    return (
      <>
        <img alt='' src={userAuthInfo.avatarId} />
      
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar alt="no image here" color="initials" name={userAuthInfo.getInitials()} size={'md'} src={userAuthInfo.avatarId} />
          </Menu.Target>
          <Menu.Dropdown>
            {accountMenu.map((item, index) =>
            {
              return <CommandElement key={index} command={item} elementType="menuItem" size={'md'} />;
            })}
          </Menu.Dropdown>
        </Menu></>
    );
  };

  return (
    <AppShell
      footer={{ height: 60, collapsed: true }}
      header={{ height: { base: 48, sm: 60, lg: 76 } }}
      layout="default"
      navbar={{
        width: 400,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
      }}
      padding="md"
      transitionDuration={500}
      transitionTimingFunction="ease-in-out"
    >
      {/* Заголовок */}
      {
        <AppShell.Header>
          <Group h="100%" justify="space-between" px="md">
            <Burger hiddenFrom="sm" opened={mobileOpened} size="sm" onClick={toggleMobile} />
            <Burger opened={desktopOpened} size="sm" visibleFrom="sm" onClick={toggleDesktop} />
            {userAuthInfo && userAuthInfo.name}
            {renderAccount()}
          </Group>
        </AppShell.Header>
      }

      <AppShell.Navbar p="md">{renderLeftNavbar()}</AppShell.Navbar>
      <AppShell.Main>{page}</AppShell.Main>
      <AppShell.Footer />
    </AppShell>
  );
};
