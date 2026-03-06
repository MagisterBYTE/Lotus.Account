import { Button, Checkbox } from '@mantine/core';
import type { IResult } from 'lotus-core/types';
import { Divider } from 'lotus-ui-react/components/Display';
import { TextInput } from 'lotus-ui-react/components/Inputs';
import { Box, VerticalStack } from 'lotus-ui-react/components/Layout';
import { useProxyObject } from 'lotus-ui-react/hooks';
import { Notifications } from 'lotus-ui-react/modules/feedback';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LocalizationAccount } from '#localization';
import { RegisterParameters } from '../../domain';

export interface IRegistrationFormProps
{
  /**
   * Путь в случае успешного входа
   */
  pathSuccess: string;
}

export function RegistrationForm(props: IRegistrationFormProps)
{
  const { pathSuccess } = props;

  const navigate = useNavigate();

  const [isRegistering, setRegistering] = useState(false);

  const registerParameters = useProxyObject({ object: new RegisterParameters() });

  // #region Handlers
  const handleButtonRegister = async () =>
  {
    setRegistering(true);
    try
    {
      await registerParameters.register();
      setRegistering(false);

      if (pathSuccess)
      {
        void navigate(pathSuccess);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error)
    {
      setRegistering(false);
      // const response = error as any as IResult;
      const okk:IResult = {
        succeeded: true
      };
      Notifications.showResult(okk); // (response, {position: 'top-right', message: '', autoClose: false});
      // notifications.show({position: 'top-right', message: 'sdfsdfsdfds'});
    }
  };
  // #endregion

  return (
    <VerticalStack bdRadius="sm" hAlign="stretch" m={'lg'} p="xs" spacing={'md'} w="min(400px, 80vw)">

      <Box centerContent={'center'} style={{ fontSize: '1.5rem' }}>{LocalizationAccount.data.auth.registration}</Box>

      <Divider nml nmr ml={'xs'} mr={'xs'} />

      <TextInput
        required
        error={registerParameters.validationStatus.getErrorByKey('login')}
        label="login"
        textInputProps={
          {
            placeholder: LocalizationAccount.data.auth.placeholderLogin,
            radius: 'sm'
          }
        }
        value={registerParameters.login}
        onChange={(event) => registerParameters.setLogin(event.target.value)}
      />

      <TextInput
        required
        error={registerParameters.validationStatus.getErrorByKey('email')}
        label="email"
        textInputProps={
          {
            placeholder: LocalizationAccount.data.auth.placeholderLogin,
            radius: 'sm'
          }
        }
        value={registerParameters.email}
        onChange={(event) => { registerParameters.setEmail(event.target.value); }}
      />

      <Checkbox
        checked={registerParameters.term}
        label={LocalizationAccount.data.auth.term}
        onChange={(event) => registerParameters.setTerm(event.currentTarget.checked)}
      />

      <Checkbox
        checked={registerParameters.rememberMe}
        label={LocalizationAccount.data.auth.remember}
        onChange={(event) => registerParameters.setRememberMe(event.currentTarget.checked)}
      />

      <Button 
        disabled={!registerParameters.validate()}
        loading={isRegistering} 
        radius="sm" onClick={() => { void handleButtonRegister(); }}>
        {LocalizationAccount.data.auth.register}
      </Button>
    </VerticalStack>
  );
}
