import { Button, Checkbox, Divider, useMantineTheme } from '@mantine/core';
import { IconBrandGoogle, IconBrandVk } from '@tabler/icons-react';
import { Environment } from 'lotus-core/environment';
import type { IResult } from 'lotus-core/types';
import { TextField } from 'lotus-ui-react/components/Controls';
import { Text } from 'lotus-ui-react/components/Display';
import { HorizontalStack } from 'lotus-ui-react/components/Layout';
import { useProxyObject } from 'lotus-ui-react/hooks';
import { Notifications } from 'lotus-ui-react/modules/feedback';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { RoutesAccount } from '#app';
import { ContainerForm } from '#components';
import { LocalizationAccount } from '#localization';
import { useAuthContext } from '../../../../provider/auth';
import { AuthService } from '../../AuthService';
import { LoginParameters, UserAuthorizeInfo } from '../../domain';

export interface ILoginFormProps
{
  /**
   * Путь в случае успешного входа
   */
  pathSuccess: string;
}

export function LoginForm(props: ILoginFormProps)
{
  const { pathSuccess } = props;

  const navigate = useNavigate();
  const theme = useMantineTheme();
  const isDebug = Environment.isDevelopment;

  const [isLogging, setLogging] = useState(false);
  const { setUserAuthInfo } = useAuthContext();

  // Используем useMemo для создания единственного экземпляра
  const loginInstance = useMemo(() =>
  {
    return new LoginParameters();
  }, []);
  const loginParameters = useProxyObject({ object: loginInstance });

  // #region Handlers
  const handleLogin = async () =>
  {
    setLogging(true);
    try
    {
      const userInfo = await AuthService.loginAsync(loginParameters);
      setUserAuthInfo(new UserAuthorizeInfo(userInfo));
      setLogging(false);

      if (pathSuccess)
      {
        void navigate(pathSuccess);
      }
    }
    catch (error)
    {
      setLogging(false);
      const response = error as IResult;
      Notifications.showResult(response);
      setUserAuthInfo(undefined);
    }
  };

  const handleGoogle = async () =>
  {
    setLogging(true);
    try
    {
      const userInfo = await AuthService.loginGoogleAsync();
      setUserAuthInfo(new UserAuthorizeInfo(userInfo));
      setLogging(false);

      if (pathSuccess)
      {
        void navigate(pathSuccess);
      }
    }
    catch (error)
    {
      setLogging(false);
      const response = error as IResult;
      Notifications.showResult(response);
      setUserAuthInfo(undefined);
    }
  };

  const handleDebug = () =>
  {
    loginParameters.setLogin('DanielDem', false);
    loginParameters.setPassword('!198418dsfA!', true);
  };
  // #endregion

  // #region Render
  const renderGoogleButton = () =>
  {
    const icon = <IconBrandGoogle color={theme.colors.red[3]} />;
    return (
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      <Button disabled={isLogging} leftSection={icon} radius="sm" variant="default" w={'160px'} onClick={handleGoogle}>
        Google
      </Button>
    );
  };
  const renderVkButton = () =>
  {
    const icon = <IconBrandVk color={theme.colors.blue[3]} />;
    return (
      <Button disabled={isLogging} leftSection={icon} radius="sm" variant="default" w={'160px'}>
        Vk
      </Button>
    );
  };
  // #endregion

  return (
    <ContainerForm hasDivider header={LocalizationAccount.data.auth.entrance} spacing={'lg'}>
      <HorizontalStack hAlign="space-between" mb="md" mt="md" spacing={'md'}>
        {renderGoogleButton()}
        {renderVkButton()}
      </HorizontalStack>

      <Divider label={LocalizationAccount.data.auth.continueWith} labelPosition="center" my="md" />

      <TextField
        inlinePlace
        required
        error={loginParameters.validationStatus.getErrorByKey('login')}
        label={LocalizationAccount.data.auth.login}
        labelProps={{
          w: '120px'
        }}
        textInputProps={{
          disabled: isLogging,
          value: loginParameters.login,
          placeholder: LocalizationAccount.data.auth.placeholderLogin,
          onChange: (event) => loginParameters.setLogin(event.target.value, true),
          radius: 'sm'
        }}
      />

      <TextField
        inlinePlace
        required
        error={loginParameters.validationStatus.getErrorByKey('password')}
        label={LocalizationAccount.data.auth.password}
        labelProps={{
          w: '120px'
        }}
        textInputProps={{
          disabled: isLogging,
          value: loginParameters.password,
          placeholder: LocalizationAccount.data.auth.placeholderPassword,
          onChange: (event) => loginParameters.setPassword(event.target.value, true),
          radius: 'sm'
        }}
      />

      {isDebug && (
        <HorizontalStack hAlign="space-between">
          <Checkbox
            checked={loginParameters.rememberMe}
            disabled={isLogging}
            label={LocalizationAccount.data.auth.remember}
            onChange={(event) => loginParameters.setRememberMe(event.currentTarget.checked, true)}
          />
          <Button radius="sm" onClick={handleDebug}>
            Debug Input
          </Button>
        </HorizontalStack>
      )}

      {!isDebug && (
        <Checkbox
          checked={loginParameters.rememberMe}
          disabled={isLogging}
          label={LocalizationAccount.data.auth.remember}
          onChange={(event) => loginParameters.setRememberMe(event.currentTarget.checked, true)}
        />
      )}

      <Button disabled={!loginParameters.validation()} loading={isLogging} radius="sm" onClick={void handleLogin}>
        {LocalizationAccount.data.auth.comeIn}
      </Button>

      <Text fontSize={'sm'}>Нет аккаунта,<Link to={RoutesAccount.register.path}> зарегистрироваться</Link></Text>
    </ContainerForm>
  );
}
