"use client";

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fab } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
	routeAdd: string;
}

export default function DefaultFABAddIcon({ routeAdd }: Props) {
	const router = useRouter();

	return (
		<Fab
			onClick={() => router.push(routeAdd)}
			className="absolute bottom-0 right-0 mb-7 mr-8 flex items-center justify-center bg-primary hover:bg-secondary"
			aria-label="add">
			<FontAwesomeIcon
				size="1x"
				color="#FFF"
				icon={faAdd}
				className="w-7"
			/>
		</Fab>
	);
}
