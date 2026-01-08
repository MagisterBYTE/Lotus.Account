import type { IRoute } from 'lotus-core/modules/route';
import * as React from 'react';
import { LocalizationAccount } from '#localization';
import { RoutePermission } from '#modules/auth';
import { type IMainLayoutProps, MainLayout } from './MainLayout';

export interface IMainLayoutPermissionProps extends IMainLayoutProps, IRoute
{

}

export const MainLayoutPermission: React.FC<IMainLayoutPermissionProps> = (props:IMainLayoutPermissionProps) => 
{
  const { page, isShouldBeAuthorized, permissions } = props;

  return (<RoutePermission 
    accessDenied={<MainLayout page={<>{LocalizationAccount.data.auth.accessDenied}</>} />}
    component={<MainLayout page={page} />}
    isShouldBeAuthorized={isShouldBeAuthorized}
    permissions={permissions} />);
};
