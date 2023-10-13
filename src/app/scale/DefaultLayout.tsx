"use client";

import DefaultFABAddIcon from "@/components/DefaultFABAddIcon";
import DefaultFABSaveIcon from "@/components/DefaultFABSaveIcon";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { useState } from "react";

interface Props {
	title: string;
	fields: JSX.Element;
	handleSave?: () => void;
}

export default function DefaultLayout({ title, fields, handleSave }: Props) {
	const [loading, setLoading] = useState(true);

	return (
		<Layout
			title={title}
			headerTitle="Escalas"
			menuActiveKey="scale">
			{loading ? (
				<>
					<Loader />
				</>
			) : (
				<>
					{fields}
					{handleSave ? (
						<DefaultFABSaveIcon
							handleSave={handleSave}
							routeRedirect="/scale"
						/>
					) : (
						<DefaultFABAddIcon routeAdd="/scale/create" />
					)}
				</>
			)}
		</Layout>
	);
}
