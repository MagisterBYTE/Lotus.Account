import { Box } from 'lotus-ui-react/components/Layout';
import { RegistrationForm } from '../../modules/auth/ui/RegistrationForm';

export interface IRegistrationPageProps
{
  /**
   * Путь в случае успешной регистрации
   */
  pathSuccess: string;
}

export const RegistrationPage: React.FC<IRegistrationPageProps> = (props: IRegistrationPageProps) =>
{
  const { pathSuccess } = props;
  return <Box centerContent={'center'} p={'md'}><RegistrationForm pathSuccess={pathSuccess} /></Box>;
};
