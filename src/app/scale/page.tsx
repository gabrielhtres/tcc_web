"use client";

import Layout from "@/components/Layout";
import DefaultTable from "@/components/DefaultTable";
import { useParams } from "next/navigation";
import DefaultFABAddIcon from "@/components/DefaultFABAddIcon";

export default function ScaleList() {
	const params = useParams();

	console.log(params);

	return (
		<Layout
			title="Listagem de Escalas"
			headerTitle="Escalas"
			menuActiveKey="scale">
			<DefaultTable />
			<DefaultFABAddIcon routeAdd="/scale/create" />
		</Layout>
	);
}
