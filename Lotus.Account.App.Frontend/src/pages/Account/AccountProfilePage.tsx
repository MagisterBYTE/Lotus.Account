/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextInput } from '@mantine/core';
import { Box, VerticalStack } from 'lotus-ui-react/components/Layout';
import { AvatarEditor } from 'lotus-ui-react/external';
import { useState } from 'react';

export function AccountProfilePage()
{
  const [isEdit, setEdit] = useState(false);

  const [avatar, setAvatar] = useState<string>('');

  const handleAvatarSave = (imageData: string) => 
  {
    console.log('Avatar saved:', imageData);
    setAvatar(imageData);
    // Здесь можно отправить imageData на сервер
  };

  return (
    <Box centerContent="center">
      <AvatarEditor
        border={10}
        color={[255, 255, 255, 0.6]} // RGBA
        height={250}
        image="https://dummyimage.com/400x400/d141d1/b2b3bd.png&text=%D1%84%D0%B2%D1%8B%D1%84%D0%B2%D1%84%D1%8B%D0%B2%D1%84"
        rotate={0}
        scale={1.2}
        width={250}
      />

      <VerticalStack bdRadius hAlign="stretch" m={'lg'} p={'lg'} spacing={'md'} w="min(600px, 80vw)">
        <TextInput
          required
          label="Сменить ник"
          radius="sm"
          value={''}
          onChange={(event) => { }}
        />

        <TextInput
          required
          label="Сменить почту"
          radius="sm"
          value={''}
          onChange={(event) => { }}
        />
      </VerticalStack>
    </Box>
  );
}
