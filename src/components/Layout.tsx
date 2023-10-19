"use client";

import { Box } from "@mui/material";
import Header from "./Header";
import Menu from "./Menu";

interface Props {
	children: React.ReactNode;
	title: string;
	headerTitle: string;
	menuActiveKey: "scale" | "perfil" | "help";
}

export default function Layout({
	children,
	title,
	headerTitle,
	menuActiveKey,
}: Props) {
	return (
		<main className="flex min-h-screen min-w-max">
			<Menu activeKey={menuActiveKey} />
			<Box className="flex h-screen w-8.5/10 flex-col">
				<Header title={headerTitle} />
				<Box className="h-full overflow-y-hidden bg-gray-300 p-2">
					<Box className="max-h-full min-h-full overflow-y-auto bg-gray-100 p-8 shadow-md">
						<p className="mb-4 font-semibold">{title}</p>
						{children}
					</Box>
				</Box>
			</Box>
			{/* <Box className="absolute w-8.5/10 h-8.5/10 h-full">
				
			</Box> */}
			{/*  <MainLayout /> */}
		</main>
	);
}
