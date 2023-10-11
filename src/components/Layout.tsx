import { Box } from "@mui/material";
import Header from "./Header";
import Menu from "./Menu";

export default function Layout({ children }: any) {
  return (
    <main className="min-h-screen min-w-max flex w-full">
			<Menu />
			<Header />
			{/* <Box className="absolute w-8.5/10 h-8.5/10 h-full">
				{children}
			</Box> */}
			{/*  <MainLayout /> */}
		</main>
  );
};