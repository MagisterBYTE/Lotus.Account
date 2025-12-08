import * as React from "react";
import { useEffect, useState } from "react";
import { ToastWrapper, toastError } from "lotus-ui-react/components/Feedback";
import { AuthService } from "#modules/auth";
import { LocalizationAccount } from "#localization";

export interface IAutoLoginPageProps
{
  /**
   * Путь в случае успешного автоматического входа
   */
  pathSuccess: string;
}

export const AutoLoginPage: React.FC<IAutoLoginPageProps> = (props: IAutoLoginPageProps) =>
{
  const { pathSuccess } = props;

  const [isLoading, setLoading] = useState(false);

  useEffect(() =>
  {
    setLoading(true);
    try
    {
      AuthService.loginAuthCookie(pathSuccess);
      setLoading(false);
    } catch (error)
    {
      setLoading(false);
      const response = error as any;
      toastError(response, LocalizationAccount.data.auth.authFailed);
    }
  }, []);

  return (
    <>
      <div>{LocalizationAccount.data.auth.authFailed}</div>
      <ToastWrapper />
    </>
  );
};
