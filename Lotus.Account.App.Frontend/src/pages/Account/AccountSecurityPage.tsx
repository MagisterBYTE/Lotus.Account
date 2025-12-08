import { TextField } from 'lotus-ui-react/components/Controls';
import { Label } from 'lotus-ui-react/components/Display';
import { Box, VerticalStack } from 'lotus-ui-react/components/Layout';
import React from 'react';

export const AccountSecurityPage: React.FC = () =>
{
  return (
    <Box centerContent='center'>
      <VerticalStack m={'lg'} p={'lg'} spacing={'md'} w={'min(600px, 80vw)'} borderRadius>
        <Label fontSize={'lg'} fontBold children={'Сменить пароль'} />
        <TextField inlinePlace label={"Новый пароль"} labelProps={{w: '160px'}}  textInputProps={{value: 'dddd'}} />
        <TextField inlinePlace label={"Повторите пароль"} labelProps={{w: '160px'}}  />
      </VerticalStack>
    </Box>
  );
};
