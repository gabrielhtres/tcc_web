"use client";

import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fab } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
	handleSave: () => void;
	routeRedirect: string;
}

export default function DefaultFABSaveIcon({
	routeRedirect,
	handleSave,
}: Props) {
	const router = useRouter();

	return (
		<Fab
			onClick={() => {
				handleSave();
				router.replace(routeRedirect);
			}}
			className="absolute bottom-0 right-0 mb-10 mr-10 flex items-center justify-center bg-primary hover:bg-secondary"
			aria-label="add">
			<FontAwesomeIcon
				size="1x"
				color="#FFF"
				icon={faSave}
				className="w-7"
			/>
		</Fab>
	);
}
