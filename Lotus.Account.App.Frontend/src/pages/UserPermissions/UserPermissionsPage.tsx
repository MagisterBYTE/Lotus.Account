import { Box } from 'lotus-ui-react/components/Layout';
import { UserPermissionList } from '#modules/userPermission';

export function UserPermissionsPage() 
{
  return (
    <Box centerContent={'center'}>
      <UserPermissionList />
    </Box>
  );
}