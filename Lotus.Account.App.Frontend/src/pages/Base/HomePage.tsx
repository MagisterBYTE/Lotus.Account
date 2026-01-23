import { Text } from 'lotus-ui-react/components/Display';
import { Box } from 'lotus-ui-react/components/Layout';
import { Link } from 'react-router';
import { RoutesAccount } from '#app';
import { useAuthContext } from '#provider';

export function HomePage() 
{
  const { userAuthInfo } = useAuthContext();
  return (
    <Box>
      <h3>Добро пожаловать в модуль аккаунта {userAuthInfo?.getDisplayName()}</h3>
      {!userAuthInfo &&
        <Text>
          Для выполнения основных действий вы должны <Link to={RoutesAccount.login.path}>войти</Link> или  
          <Link to={RoutesAccount.register.path}> зарегистрироваться</Link>
        </Text>}
      {!!userAuthInfo &&
        <Text>
          Основные действия доступны через левое бокове меню или личный кабинет аккаунта 
        </Text>}
    </Box>
  );
}