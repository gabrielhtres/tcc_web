import { Box } from '@mui/material';
import Header from './Header';
import Menu from './Menu';

interface Props {
  children: React.ReactNode;
  title: string;
  headerTitle: string;
  menuActiveKey: 'scale' | 'perfil' | 'help';
}

export default function Layout({
  children,
  title,
  headerTitle,
  menuActiveKey,
}: Props) {
  return (
    <main className="min-h-screen min-w-max flex">
      <Menu activeKey={menuActiveKey} />
      <Box className="flex flex-col w-8.5/10">
        <Header title={headerTitle} />
        <Box className="h-9.3/10 min-h-9.3/10 p-8 bg-gray-200">
          <p className="font-semibold mb-4">{title}</p>
          {children}
        </Box>
      </Box>
      {/* <Box className="absolute w-8.5/10 h-8.5/10 h-full">
				
			</Box> */}
      {/*  <MainLayout /> */}
    </main>
  );
}
