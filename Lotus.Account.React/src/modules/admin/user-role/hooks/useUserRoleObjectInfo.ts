import { useEffect, useState } from 'react';
import { ISelectOption } from 'lotus-core-react';
import { UserPermissionApi } from 'modules/admin/user-permission';
import { UserRoleObjectInfo, UserRoleObjectInfoClass } from '../domain/UserRoleObjectInfo';


export const useUserRoleObjectInfo = (): UserRoleObjectInfoClass => 
{
  const [permissionOptions, setPermissionOptions] = useState<ISelectOption[]>([]);

  useEffect(() => 
  {
    const response = UserPermissionApi.getUserPermissionsAsOptionsAsync();
    response.then((value) =>
    {
      setPermissionOptions(value);
    })
  }, []);

  const prop = UserRoleObjectInfo.getPropertyByName('permissionIds');
  prop.options = permissionOptions;

  return UserRoleObjectInfo;
};