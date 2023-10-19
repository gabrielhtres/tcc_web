"use client";

import api from "@/utils/api";
import { faEye, faInbox, faList } from "@fortawesome/free-solid-svg-icons";
// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
// import { faBackwardStep } from "@fortawesome/free-solid-svg-icons/faBackwardStep";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
// import { faForwardStep } from "@fortawesome/free-solid-svg-icons/faForwardStep";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Box,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface DefaultDataType {
	id: number;
	name: string;
}

interface Props {
	data: DefaultDataType[];
	route: string;
	appRoute?: string;
	listRoute?: string;
	resetData: () => void;
}

// interface TablePaginationActionsProps {
//   count: number;
//   page: number;
//   rowsPerPage: number;
//   onPageChange: (
//     event: React.MouseEvent<HTMLButtonElement>,
//     newPage: number,
//   ) => void;
// }

// function TablePaginationActions(props: TablePaginationActionsProps) {
// 	const theme = useTheme();
// 	const { count, page, rowsPerPage, onPageChange } = props;

// 	const handleFirstPageButtonClick = (
// 		event: React.MouseEvent<HTMLButtonElement>,
// 	) => {
// 		onPageChange(event, 0);
// 	};

// 	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
// 		onPageChange(event, page - 1);
// 	};

// 	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
// 		onPageChange(event, page + 1);
// 	};

// 	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
// 		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
// 	};

// 	return (
// 		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
// 			<IconButton
// 				onClick={handleFirstPageButtonClick}
// 				disabled={page === 0}
// 				aria-label="first page"
// 			>
// 				{theme.direction === "rtl" ? <FontAwesomeIcon icon={faForwardStep} size="1x" className="w-2" /> : <FontAwesomeIcon icon={faBackwardStep} />}
// 			</IconButton>
// 			<IconButton
// 				onClick={handleBackButtonClick}
// 				disabled={page === 0}
// 				aria-label="previous page"
// 			>
// 				{theme.direction === "rtl" ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleLeft} />}
// 			</IconButton>
// 			<IconButton
// 				onClick={handleNextButtonClick}
// 				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
// 				aria-label="next page"
// 			>
// 				{theme.direction === "rtl" ? <FontAwesomeIcon icon={faAngleLeft} /> : <FontAwesomeIcon icon={faAngleRight} />}
// 			</IconButton>
// 			<IconButton
// 				onClick={handleLastPageButtonClick}
// 				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
// 				aria-label="last page"
// 			>
// 				{theme.direction === "rtl" ? <FontAwesomeIcon icon={faBackwardStep} /> : <FontAwesomeIcon icon={faForwardStep} />}
// 			</IconButton>
// 		</Box>
// 	);
// }

export default function DefaultTable({
	data,
	route,
	listRoute,
	appRoute,
	resetData,
}: Props) {
	const router = useRouter();
	// const [page, setPage] = useState(0);
	// const [rowsPerPage, setRowsPerPage] = useState(5);

	// Avoid a layout jump when reaching the last page with empty rows.
	// const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	// const handleChangePage = (
	// 	event: React.MouseEvent<HTMLButtonElement> | null,
	// 	newPage: number,
	// ) => {
	// 	setPage(newPage);
	// };

	// const handleChangeRowsPerPage = (
	// 	event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	// ) => {
	// 	setRowsPerPage(parseInt(event.target.value, 10));
	// 	setPage(0);
	// };

	const handleList = (id: number) => {
		if (listRoute) router.push(`${listRoute}/${id}`);
		return;
	};

	const handleViewEdit = (id: number, edit?: boolean) => {
		router.push(`${appRoute || route}/${edit ? "edit" : "detail"}/${id}`);
		return;
	};

	const handleDelete = (id: number) => {
		api.delete(`${route}/${id}`).then(res => {
			console.log(res.data);
			resetData();
		});
	};

	return data.length > 0 ? (
		// <Box className="w-full bg-gray-200">
		// 	<Box className="flex justify-center items-center p-8 w-full bg-opacity-30">
		<TableContainer className="rounded-lg bg-white">
			<Table /*className="rounded-3xl"*/>
				<TableHead>
					<TableRow>
						<TableCell className="w-8.5/10 py-2 font-semibold">
							Escala
						</TableCell>
						<TableCell className="py-2 text-center font-semibold">
							Ações
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(row => (
						<TableRow key={row.id}>
							<TableCell size="small">{row.name}</TableCell>
							<TableCell size="small">
								<Box className="flex w-full justify-around">
									{listRoute && (
										<IconButton
											onClick={() => handleList(row.id)}>
											<FontAwesomeIcon
												className="w-5"
												// size="sm"
												color="#3CB371"
												icon={faList}
											/>
										</IconButton>
									)}

									<IconButton
										onClick={() => handleViewEdit(row.id)}>
										<FontAwesomeIcon
											className="w-5"
											// size="sm"
											color="#4169E1"
											icon={faEye}
										/>
									</IconButton>
									<IconButton
										onClick={() =>
											handleViewEdit(row.id, true)
										}>
										<FontAwesomeIcon
											className="w-5"
											// size="sm"
											color="#FFA500"
											icon={faEdit}
										/>
									</IconButton>
									<IconButton
										onClick={() => handleDelete(row.id)}>
										<FontAwesomeIcon
											className="w-4"
											// size="sm"
											color="#FF4500"
											icon={faTrash}
										/>
									</IconButton>
								</Box>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				{/* <TableFooter>
							<TableRow>
								<TablePagination 
									rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
									colSpan={3}
									count={rows.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										label: "Linhas Por Página",
										inputProps: {
											"aria-label": "Linhas Por Página",
										},
										native: true,
									}}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActions}  />
							</TableRow>
						</TableFooter> */}
			</Table>
		</TableContainer>
	) : (
		// 	</Box>
		// </Box>
		<Box className="flex h-full w-full flex-col items-center justify-center pb-20">
			<FontAwesomeIcon
				icon={faInbox}
				size="6x"
			/>
			<p>Não há dados cadastrados</p>
		</Box>
	);
}
