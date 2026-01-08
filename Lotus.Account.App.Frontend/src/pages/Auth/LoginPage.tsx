import { Box } from 'lotus-ui-react/components/Layout';
import { LoginForm } from '#modules/auth';

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
  return <Box centerContent={'center'} p={'md'}><LoginForm pathSuccess={pathSuccess} /></Box>;
};
