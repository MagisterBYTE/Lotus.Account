import { Button, Divider } from '@mantine/core';
import { TextField } from 'lotus-ui-react/components/Controls';
import { useInstanceProxy } from 'lotus-ui-react/hooks';
import { Notifications } from 'lotus-ui-react/modules/feedback';
import { useState } from 'react';
import { ContainerForm } from '#components';
import { LocalizationAccount } from '#localization';
import { UserAuthorizeInfo } from '#modules/auth';
import { useAuthContext } from '#provider';
import { AccountService } from '../../../AccountService';
import { AccountProfile } from '../../domain';

export function ProfileForm() 
{
  const { userAuthInfo, setUserAuthInfo } = useAuthContext();

  const [isUpdate, setUpdate] = useState(false);

  const accountProfile = useInstanceProxy(() => new AccountProfile(userAuthInfo));

  const labelWidth = '140px';

  // #region Handlers
  const handleUpdateInfo = async () =>
  {
    setUpdate(true);
    try
    {
      const response =  await AccountService.updateUserInfo(accountProfile.toUserAuthorizeInfo());
      setUserAuthInfo(new UserAuthorizeInfo(response.payload));
      setUpdate(false);
      Notifications.showSuccess(LocalizationAccount.data.account.profileUpdateSuccess);
    }
    catch (error)
    {
      setUpdate(false);
      Notifications.showError(error);
    }
  };
  // #endregion

  return (
    <ContainerForm hasDivider header={LocalizationAccount.data.account.profile} spacing={'lg'}>
      <TextField
        inlinePlace
        error={accountProfile.validationStatus.getErrorByKey('nick')}
        label="Nickname"
        labelProps={{
          w: labelWidth
        }}
        m={'xxs'}
        textInputProps={{
          value: accountProfile?.nickname,
          onChange: (e) => { accountProfile.setNickname(e.target.value); }
        }}
      />

      <TextField
        inlinePlace
        required
        error={accountProfile.validationStatus.getErrorByKey('email')}
        label="Email"
        labelProps={{
          w: labelWidth
        }}
        m={'xxs'}
        textInputProps={{
          value: accountProfile?.email,
          onChange: (e) => { accountProfile.setEmail(e.target.value); }
        }}
      />

      <Divider variant="dotted" />

      <TextField
        inlinePlace
        error={accountProfile.validationStatus.getErrorByKey('name')}
        label={LocalizationAccount.data.account.name}
        labelProps={{
          w: labelWidth
        }}
        m={'xxs'}
        textInputProps={{
          value: accountProfile?.name,
          onChange: (e) => { accountProfile.setName(e.target.value); }
        }}
      />

      <TextField
        inlinePlace
        error={accountProfile.validationStatus.getErrorByKey('surname')}
        label={LocalizationAccount.data.account.surname}
        labelProps={{
          w: labelWidth
        }}
        m={'xxs'}
        textInputProps={{
          value: accountProfile?.surname,
          onChange: (e) => { accountProfile.setSurname(e.target.value); }
        }}
      />

      <Divider />

      <TextField
        inlinePlace
        error={accountProfile.validationStatus.getErrorByKey('whereabouts')}
        label={LocalizationAccount.data.account.whereabouts}
        labelProps={{
          w: labelWidth
        }}
        m={'xxs'}
        textInputProps={{
          value: accountProfile?.whereabouts,
          onChange: (e) => { accountProfile.setWhereabouts(e.target.value); }
        }}
      />

      <TextField
        inlinePlace
        error={accountProfile.validationStatus.getErrorByKey('interests')}
        label={LocalizationAccount.data.account.interests}
        labelProps={{
          w: labelWidth
        }}
        m={'xxs'}
        textInputProps={{
          value: accountProfile?.interests,
          onChange: (e) => { accountProfile.setInterests(e.target.value); }
        }}
      />

      <Button disabled={!accountProfile.validate()} loading={isUpdate} radius="sm"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleUpdateInfo}>
        {LocalizationAccount.data.account.profileUpdate}
      </Button>
    </ContainerForm>
  );
}
