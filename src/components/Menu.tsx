"use client";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { faChartGantt } from "@fortawesome/free-solid-svg-icons/faChartGantt";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons/faUserAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, ListItemIcon, ListItemText } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Image from "next/image";
import Logo from "../assets/logo.svg";
import Link from "next/link";
import nookies from "nookies";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
// import { Icon, IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
	activeKey: "scale" | "perfil" | "help";
}

export default function Menu({ activeKey }: Props) {
	const router = useRouter();
	const getItemColor = (key: "scale" | "perfil" | "help" | "logout") => {
		return activeKey === key ? "bg-tertiary" : "";
	};

	const CustomListItem = (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon: any,
		text: string,
		key: "scale" | "perfil" | "help" | "logout",
		route: "/scale" | "/perfil" | "/help" | "/logout",
	) => {
		if (route === "/logout") {
			return (
				<ListItem
					className={`w-full p-0 ${getItemColor(key)}`}
					onClick={() => {
						api.post("/user/logout").then(() => {
							nookies.destroy(null, "token");
							router.replace("/signin");
						});
					}}>
					<ListItemButton>
						<ListItemIcon className="w-2">
							<FontAwesomeIcon
								size="1x"
								color="#FFF"
								icon={icon}
								className="w-7 pl-2"
							/>
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			);
		}

		return (
			<Link href={route}>
				<ListItem className={`w-full p-0 ${getItemColor(key)}`}>
					<ListItemButton>
						<ListItemIcon className="w-2">
							<FontAwesomeIcon
								size="1x"
								color="#FFF"
								icon={icon}
								className="w-7 pl-2"
							/>
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			</Link>
		);
	};
	return (
		<Box className="justify-top flex h-screen w-1.5/10 flex-col items-center bg-secondary text-primary">
			<Image
				src={Logo}
				alt="GreenVision"
				className="w-full p-4"
			/>
			<List className="w-full p-0">
				{CustomListItem(faChartGantt, "Escala", "scale", "/scale")}
				{CustomListItem(faUserAlt, "Meu Perfil", "perfil", "/perfil")}
				{CustomListItem(
					faQuestionCircle,
					"Suporte e Ajuda",
					"help",
					"/help",
				)}
				{CustomListItem(
					faArrowRightFromBracket,
					"Sair",
					"logout",
					"/logout",
				)}
			</List>
		</Box>
	);
}
