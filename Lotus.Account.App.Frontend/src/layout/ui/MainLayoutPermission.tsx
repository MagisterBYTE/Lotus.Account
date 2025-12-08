import { LocalizationAccount } from '#localization';
import * as React from 'react';
import { type IMainLayoutProps, MainLayout } from './MainLayout';
import { RoutePermission } from '#modules/auth';
import type { IRoute } from 'lotus-core/modules/route';

export interface IMainLayoutPermissionProps extends IMainLayoutProps, IRoute
{

}

export const MainLayoutPermission: React.FC<IMainLayoutPermissionProps> = (props:IMainLayoutPermissionProps) => 
{
  const {page, isShouldBeAuthorized, permissions } = props;

  return <RoutePermission 
    component={<MainLayout page={page} />}
    accessDenied={<MainLayout page={<>{LocalizationAccount.data.auth.accessDenied}</>}/>}
    isShouldBeAuthorized={isShouldBeAuthorized}
    permissions={permissions}/>
};
