import { ContainerForm } from "#components"
import { TextField } from "lotus-ui-react/components/Controls";

export function ProfileForm()
{
  return (
    <ContainerForm header="Профиль" >
      <TextField
        inlinePlace
        required
        labelProps={{
          w: "120px",
        }}
        label="Nick" />

      <TextField
        inlinePlace
        required
        labelProps={{
          w: "120px",
        }}
        label="Email"
      />
    </ContainerForm>
  );
};
