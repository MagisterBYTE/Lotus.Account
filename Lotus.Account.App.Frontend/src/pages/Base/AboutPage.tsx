import { Box } from 'lotus-ui-react/components/Layout';
import SmetaTable from './SmetaTable';

export function AboutPage() {
  // oxlint-disable-next-line typescript/no-explicit-any
  const handleDataChange = (data: any[]) => {
    // oxlint-disable-next-line no-console
    console.log('Данные изменены:', data);
    // Здесь можно сохранять данные в localStorage или отправлять на сервер
  };
  return (
    <Box>
      <SmetaTable onChange={handleDataChange} />
    </Box>
  );
}
