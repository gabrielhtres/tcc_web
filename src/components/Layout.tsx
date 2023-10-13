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
			<Box className="flex w-8.5/10 flex-col">
				<Header title={headerTitle} />
				<Box className="h-9.3/10 min-h-9.3/10 bg-gray-200 p-8">
					<p className="mb-4 font-semibold">{title}</p>
					{children}
				</Box>
			</Box>
			{/* <Box className="absolute w-8.5/10 h-8.5/10 h-full">
				
			</Box> */}
			{/*  <MainLayout /> */}
		</main>
	);
}
