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

export default function Menu() {
	return (
		<Box className="flex flex-col justify-top items-center h-screen bg-secondary max-w-lg w-64 text-primary">
			<Image src={Logo} alt="GreenVision" className="w-full p-4" />
			<List className="w-full p-0">
				<ListItem className="w-full p-0 bg-tertiary">
					<ListItemButton>
						<ListItemIcon className="w-2">
							<FontAwesomeIcon size="1x" color="#FFF" icon={faChartGantt} className="w-7 pl-2" />
						</ListItemIcon>
						<ListItemText primary="Escalas" />
					</ListItemButton>
				</ListItem>
				<ListItem className="w-full p-0">
					<ListItemButton>
						<ListItemIcon className="w-2">
							<FontAwesomeIcon size="1x" color="#FFF" icon={faUserAlt} className="w-7 pl-2" />
						</ListItemIcon>
						<ListItemText primary="Meu Perfil" />
					</ListItemButton>
				</ListItem>
				<ListItem className="w-full p-0">
					<ListItemButton>
						<ListItemIcon className="w-2">
							<FontAwesomeIcon size="1x" color="#FFF" icon={faQuestionCircle} className="w-7 pl-2" />
						</ListItemIcon>
						<ListItemText primary="Suporte e Ajuda" />
					</ListItemButton>
				</ListItem>
				<ListItem className="w-full p-0">
					<ListItemButton>
						<ListItemIcon className="w-2">
							<FontAwesomeIcon size="1x" color="#FFF" icon={faArrowRightFromBracket} className="w-7 pl-2" />
						</ListItemIcon>
						<ListItemText primary="Sair" />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
}
