import { ContainerForm } from "#components";
import { LocalizationAccount } from "#localization";
import { Button, Checkbox, Divider, useMantineTheme } from "@mantine/core";
import { IconBrandGoogle, IconBrandVk } from "@tabler/icons-react";
import type { IResult } from "lotus-core/types";
import { TextField } from "lotus-ui-react/components/Controls";
import { HorizontalStack } from "lotus-ui-react/components/Layout";
import { Text } from "lotus-ui-react/components/Display";
import { useProxyObject } from "lotus-ui-react/hooks";
import { Notifications } from "lotus-ui-react/modules/feedback";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { LoginParameters, UserAuthorizeInfo } from "../../domain";
import { RoutesAccount } from "#app";
import { AuthService } from "../../AuthService";
import { useAuthContext } from "../../../../provider/auth";
import { Environment } from "lotus-core/environment";

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

  //#region Handlers
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
        navigate(pathSuccess);
      }
    } catch (error)
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
        navigate(pathSuccess);
      }
    } catch (error)
    {
      setLogging(false);
      const response = error as IResult;
      Notifications.showResult(response);
      setUserAuthInfo(undefined);
    }
  };

  const handleDebug = async () =>
  {
    loginParameters.setLogin("DanielDem", false);
    loginParameters.setPassword("!198418dsfA!", true);
  };
  //#endregion

  //#region Render
  const renderGoogleButton = () =>
  {
    const icon = <IconBrandGoogle color={theme.colors.red[3]} />;
    return (
      <Button disabled={isLogging} variant="default" w={"160px"} radius="sm" leftSection={icon} onClick={handleGoogle}>
        Google
      </Button>
    );
  }
  const renderVkButton = () =>
  {
    const icon = <IconBrandVk color={theme.colors.blue[3]} />;
    return (
      <Button disabled={isLogging} variant="default" w={"160px"} radius="sm" leftSection={icon}>
        Vk
      </Button>
    );
  }
  //#endregion

  return (
    <ContainerForm header={LocalizationAccount.data.auth.entrance} spacing={"lg"} hasDivider>
      <HorizontalStack mb="md" mt="md" hAlign="space-between" spacing={"md"}>
        {renderGoogleButton()}
        {renderVkButton()}
      </HorizontalStack>

      <Divider label={LocalizationAccount.data.auth.continueWith} labelPosition="center" my="md" />

      <TextField
        inlinePlace
        required
        labelProps={{
          w: "120px",
        }}
        label={LocalizationAccount.data.auth.login}
        textInputProps={{
          disabled: isLogging,
          value: loginParameters.login,
          placeholder: LocalizationAccount.data.auth.placeholderLogin,
          onChange: (event) => loginParameters.setLogin(event.target.value, true),
          radius: "sm",
        }}
        error={loginParameters.validationStatus.getErrorByKey("login")}
      />

      <TextField
        labelProps={{
          w: "120px",
        }}
        required
        inlinePlace
        label={LocalizationAccount.data.auth.password}
        textInputProps={{
          disabled: isLogging,
          value: loginParameters.password,
          placeholder: LocalizationAccount.data.auth.placeholderPassword,
          onChange: (event) => loginParameters.setPassword(event.target.value, true),
          radius: "sm",
        }}
        error={loginParameters.validationStatus.getErrorByKey("password")}
      />

      {isDebug && (
        <HorizontalStack hAlign="space-between">
          <Checkbox
            disabled={isLogging}
            label={LocalizationAccount.data.auth.remember}
            checked={loginParameters.rememberMe}
            onChange={(event) => loginParameters.setRememberMe(event.currentTarget.checked, true)}
          />
          <Button radius="sm" onClick={handleDebug}>
            Debug Input
          </Button>
        </HorizontalStack>
      )}

      {!isDebug && (
        <Checkbox
          disabled={isLogging}
          label={LocalizationAccount.data.auth.remember}
          checked={loginParameters.rememberMe}
          onChange={(event) => loginParameters.setRememberMe(event.currentTarget.checked, true)}
        />
      )}

      <Button disabled={!loginParameters.validation()} loading={isLogging} radius="sm" onClick={handleLogin}>
        {LocalizationAccount.data.auth.comeIn}
      </Button>

      <Text fontSize={'sm'}>Нет аккаунта,<Link to={RoutesAccount.register.path}> зарегистрироваться</Link></Text>
    </ContainerForm>
  );
}
