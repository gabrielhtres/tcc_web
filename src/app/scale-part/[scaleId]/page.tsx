"use client";

import Layout from "@/components/Layout";
import DefaultTable from "@/components/DefaultTable";
import DefaultFABAddIcon from "@/components/DefaultFABAddIcon";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useParams } from "next/navigation";

export default function ScaleList() {
	const params = useParams();
	const { scaleId } = params;
	const [data, setData] = useState([]);

	const resetData = () => {
		api.get(`/scale/part/list/${scaleId}`).then(res => {
			setData(res.data);
		});
	};

	useEffect(() => {
		resetData();
	}, []);

	return (
		<Layout
			title="Listagem de Partes"
			headerTitle="Escalas"
			menuActiveKey="scale">
			<DefaultTable
				data={data}
				route={`/scale/part`}
				appRoute={`/scale-part/${scaleId}`}
				resetData={resetData}
			/>
			<DefaultFABAddIcon routeAdd={`/scale-part/${scaleId}/create`} />
		</Layout>
	);
}
