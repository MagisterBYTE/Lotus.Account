import { TextInput } from "@mantine/core";
import { Box, VerticalStack } from "lotus-ui-react/components/Layout";
import { AvatarEditor } from "lotus-ui-react/external";
import { useState } from "react";

export function AccountProfilePage()
{
  const [isEdit, setEdit] = useState(false);

  const [avatar, setAvatar] = useState<string>('');

  const handleAvatarSave = (imageData: string) => {
    console.log('Avatar saved:', imageData);
    setAvatar(imageData);
    // Здесь можно отправить imageData на сервер
  };

  return (
    <Box centerContent="center">
      <AvatarEditor
        image="https://dummyimage.com/400x400/d141d1/b2b3bd.png&text=%D1%84%D0%B2%D1%8B%D1%84%D0%B2%D1%84%D1%8B%D0%B2%D1%84"
        width={250}
        height={250}
        border={10}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={1.2}
        rotate={0}
      />

      <VerticalStack w="min(600px, 80vw)" spacing={'md'} borderRadius m={'lg'} p={'lg'} hAlign="stretch">
        <TextInput
          required
          label="Сменить ник"
          value={''}
          onChange={(event) => { }}
          radius="sm"
        />

        <TextInput
          required
          label="Сменить почту"
          value={''}
          onChange={(event) => { }}
          radius="sm"
        />
      </VerticalStack>
    </Box>
  );
};
