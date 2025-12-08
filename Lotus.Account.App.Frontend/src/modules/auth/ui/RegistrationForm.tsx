import { LocalizationAccount } from "#localization";
import { Button, Checkbox, TextInput } from "@mantine/core";
import type { IResult } from "lotus-core/types";
import { Divider } from 'lotus-ui-react/components/Display';
import { Box, VerticalStack } from 'lotus-ui-react/components/Layout';
import { useProxyObject } from "lotus-ui-react/hooks";
import { useState } from "react";
import { useNavigate } from "react-router";
import { RegisterParameters } from "../domain/RegisterParameters";
import { Notifications } from "lotus-ui-react/modules/feedback";

export interface IRegistrationFormProps
{
  /**
   * Путь в случае успешного входа
   */
  pathSuccess: string;
}

export const RegistrationForm: React.FC<IRegistrationFormProps> = (props: IRegistrationFormProps) =>
{
  const { pathSuccess } = props;

  const navigate = useNavigate();

  const [isRegistering, setRegistering] = useState(false);

  const registerParameters = useProxyObject({ object: new RegisterParameters() });

  //#region Handlers
  const handleButtonRegister = async () =>
  {
    setRegistering(true);
    try
    {
      await registerParameters.register()
      setRegistering(false);

      if (pathSuccess)
      {
        navigate(pathSuccess)
      }

    } catch (error)
    {
      setRegistering(false);
      //const response = error as any as IResult;
      const okk:IResult = {
        succeeded: true,
      }
      Notifications.showResult(okk); //(response, {position: 'top-right', message: '', autoClose: false});
      //notifications.show({position: 'top-right', message: 'sdfsdfsdfds'});
    }
  };
  //#endregion

  return (
    <VerticalStack spacing={'md'} borderRadius="sm" p="xs" m={"lg"} w="min(400px, 80vw)" hAlign="stretch">

      <Box centerContent={'center'} style={{ fontSize: '1.5rem' }} >{LocalizationAccount.data.auth.registration}</Box>

      <Divider ml={'xs'} mr={'xs'} nml nmr />

      <TextInput
        required
        label="Login"
        placeholder={LocalizationAccount.data.auth.placeholderLogin}
        value={registerParameters.login}
        onChange={(event) => registerParameters.setLogin(event.target.value, true)}
        // error={registerParameters.invalidLogin()}
        radius="sm"
      />

      <TextInput
        required
        label="Email"
        placeholder={LocalizationAccount.data.auth.placeholderEmail}
        value={registerParameters.email}
        onChange={(event) => { registerParameters.setEmail(event.target.value, true) }}
        // error={registerParameters.invalidEmail()}
        radius="sm"
      />

      <Checkbox
        label={LocalizationAccount.data.auth.term}
        checked={registerParameters.term}
        onChange={(event) => registerParameters.setTerm(event.currentTarget.checked, true)}
      />

      <Checkbox
        label={LocalizationAccount.data.auth.remember}
        checked={registerParameters.rememberMe}
        onChange={(event) => registerParameters.setRememberMe(event.currentTarget.checked, true)}
      />

      <Button 
      //  loading={isRegistering} 
       radius="sm" onClick={() => { handleButtonRegister() }}>
        {LocalizationAccount.data.auth.register}
      </Button>
    </VerticalStack>
  );
};
