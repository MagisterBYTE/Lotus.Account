import { RoutesAccount } from "#app";
import { AuthService } from "#modules/auth";
import { Box } from "lotus-ui-react/components/Layout";
import { Link } from "react-router";
import { Text } from "lotus-ui-react/components/Display";

export function HomePage() 
{
  const isAuth = AuthService.isAuth;
  
  return (
    <Box>
      <h3>Добро пожаловать в модуль аккаунта</h3>
      {!isAuth &&
        <Text>
          Для выполнения основных действий вы должны <Link to={RoutesAccount.entrance.build({mode: 'login'})}>войти</Link> или  
          <Link to={RoutesAccount.register.path}> зарегистрироваться</Link>
        </Text>}
    </Box>
  );
};