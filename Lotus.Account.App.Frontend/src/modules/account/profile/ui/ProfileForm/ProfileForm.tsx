import { TextField } from 'lotus-ui-react/components/Controls';
import { ContainerForm } from '#components';

export function ProfileForm()
{
  return (
    <ContainerForm header="Профиль">
      <TextField
        inlinePlace
        required
        label="Nick"
        labelProps={{
          w: '120px'
        }} />

      <TextField
        inlinePlace
        required
        label="Email"
        labelProps={{
          w: '120px'
        }}
      />
    </ContainerForm>
  );
}
