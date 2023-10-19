"use client";

import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fab } from "@mui/material";

interface Props {
	// handleSave: () => void;
	routeRedirect: string;
	type: "submit" | "button";
}

export default function DefaultFABSaveIcon({
	// routeRedirect,
	type = "submit", // handleSave,
}: Props) {
	return (
		<Fab
			// onClick={() => {
			// 	handleSave();
			// 	// router.replace(routeRedirect);
			// }}
			type={type}
			className="absolute bottom-0 right-0 mb-7 mr-8 flex items-center justify-center bg-primary hover:bg-secondary"
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
