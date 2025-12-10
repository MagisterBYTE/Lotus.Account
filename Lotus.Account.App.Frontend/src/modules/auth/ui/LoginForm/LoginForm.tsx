import { ContainerForm } from "#components";
import { LocalizationAccount } from "#localization";
import { Button, Checkbox, Divider, useMantineTheme } from "@mantine/core";
import { IconBrandGoogle, IconBrandVk } from "@tabler/icons-react";
import type { IResult } from "lotus-core/types";
import { TextField } from "lotus-ui-react/components/Controls";
import { HorizontalStack } from "lotus-ui-react/components/Layout";
import { useProxyObject } from "lotus-ui-react/hooks";
import { Notifications } from "lotus-ui-react/modules/feedback";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { LoginParameters } from "../../domain";

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
  const isDebug = Boolean(process.env.PUBLIC_DEBUG_MODE);

  const [isLogging, setLogging] = useState(false);

  // Используем useMemo для создания единственного экземпляра
  const loginInstance = useMemo(() =>
  {
    return new LoginParameters();
  }, []);
  const loginParameters = useProxyObject({ object: loginInstance });

  //#region Handlers
  const handleButtonLogin = async () =>
  {
    setLogging(true);
    try
    {
      await loginParameters.loginAsync();
      setLogging(false);

      if (pathSuccess)
      {
        navigate(pathSuccess);
      }
    } catch (error)
    {
      setLogging(false);
      const response = error as any as IResult;
      Notifications.showResult(response);
    }
  };

  const handleButtonDebug = async () =>
  {
    loginParameters.setLogin("DanielDem", false);
    loginParameters.setPassword("!198418dsfA!", true);
  };
  //#endregion

  //#region Render
  const renderGoogleButton = () =>
  {
    return (
      <Button disabled={isLogging} variant="default" w={"160px"} radius="sm" leftSection={<IconBrandGoogle color={theme.colors.red[5]} />}>
        Google
      </Button>
    );
  };
  const renderVkButton = () =>
  {
    return (
      <Button disabled={isLogging} variant="default" w={"160px"} radius="sm" leftSection={<IconBrandVk color={theme.colors.blue[5]} />}>
        Vk
      </Button>
    );
  };
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
        label="Login/email"
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
        label="Password"
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
          <Button radius="sm" onClick={handleButtonDebug}>
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

      <Button disabled={!loginParameters.validation()} loading={isLogging} radius="sm" onClick={handleButtonLogin}>
        {LocalizationAccount.data.auth.comeIn}
      </Button>
    </ContainerForm>
  );
}
