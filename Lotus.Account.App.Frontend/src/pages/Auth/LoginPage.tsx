import { LoginForm } from "#modules/auth";
import { Box } from "lotus-ui-react/components/Layout";

export interface ILoginPageProps
{
  /**
   * Путь в случае успешного входа
   */
  pathSuccess: string;
}

export const LoginPage: React.FC<ILoginPageProps> = (props: ILoginPageProps) =>
{
   const { pathSuccess } = props;
   return <Box p={'md'} centerContent={'center'}><LoginForm pathSuccess={pathSuccess}/></Box>
};
