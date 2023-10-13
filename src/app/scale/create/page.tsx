"use client";

import DefaultLayout from "../DefaultLayout";

export default function ScaleCreate() {
	const handleSave = () => {
		console.log("save");
	};

	return (
		<DefaultLayout
			title="Adicionar Escala"
			fields={<div>Fields</div>}
			handleSave={handleSave}
		/>
	);
}
