"use client";

import { Box } from "@mui/material";

interface Props {
	title: string;
}

export default function Header({ title }: Props) {
	return (
		<Box className="flex h-0.7/10 min-h-0.7/10 flex-row items-center justify-center bg-primary text-primary">
			<p>{title}</p>
		</Box>
	);
}
