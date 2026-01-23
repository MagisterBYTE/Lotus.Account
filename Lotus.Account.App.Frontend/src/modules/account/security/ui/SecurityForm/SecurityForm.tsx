import { Button } from '@mantine/core';
import { TextField } from 'lotus-ui-react/components/Controls';
import { Label } from 'lotus-ui-react/components/Display';
import { useInstanceProxy } from 'lotus-ui-react/hooks';
import { Notifications } from 'lotus-ui-react/modules/feedback';
import { useState } from 'react';
import { ContainerForm } from '#components';
import { LocalizationAccount } from '#localization';
import { useAuthContext } from '#provider';
import { AccountService } from '../../../AccountService';
import { AccountChangePassword } from '../../domain';

export function SecurityForm() 
{
  const [isUpdatePassword, setUpdatePassword] = useState(false);

  const labelWidth = '140px';

  const { userAuthInfo } = useAuthContext();

  const changePassword = useInstanceProxy(() => new AccountChangePassword(userAuthInfo?.hashId ?? ''));

  // #region  Handlers
  const handleUpdatePassword = async () =>
  {
    setUpdatePassword(true);
    try
    {
      const result = await AccountService.changePassword(changePassword);
      Notifications.showResult(result);
      setUpdatePassword(false);
    }
    catch (error)
    {
      setUpdatePassword(false);
      Notifications.showError(error);
    }
  };
  // #endregion

  return (
    <ContainerForm hasDivider header={LocalizationAccount.data.account.security} spacing={'lg'}>
      <Label fontBold fontSize={'lg'}>
        {LocalizationAccount.data.account.securityChangePassword}
      </Label>

      <TextField inlinePlace error={changePassword.validationStatus.getErrorByKey('currentPassword')}
        label={LocalizationAccount.data.account.securityCurrentPassword} labelProps={{ w: labelWidth }}
        textInputProps={{ value: changePassword.currentPassword, onChange: (e) => { changePassword.setCurrentPassword(e.target.value); } }} />

      <TextField inlinePlace error={changePassword.validationStatus.getErrorByKey('newPassword')} 
        label={LocalizationAccount.data.account.securityNewPassword} labelProps={{ w: labelWidth }}
        textInputProps={{ value: changePassword.newPassword, onChange: (e) => { changePassword.setNewPassword(e.target.value); } }} />

      <TextField inlinePlace error={changePassword.validationStatus.getErrorByKey('confirmPassword')} 
      
        label={LocalizationAccount.data.account.securityConfirmPassword} labelProps={{ w: labelWidth }}
        textInputProps={{ value: changePassword.confirmPassword, onChange: (e) => { changePassword.setConfirmPassword(e.target.value); } }} />

      <Button disabled={!changePassword.validate()} loading={isUpdatePassword} radius="sm"
        style={{ alignSelf: 'flex-end' }}
        w={'max-content'}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleUpdatePassword}>
        {LocalizationAccount.data.account.securityChangePasswordButton}
      </Button>
    </ContainerForm>
  );
}
