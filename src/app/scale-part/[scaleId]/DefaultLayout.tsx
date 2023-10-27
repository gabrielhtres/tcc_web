"use client";

import DefaultFABSaveIcon from "@/components/DefaultFABSaveIcon";
import Layout from "@/components/Layout";
import api from "@/utils/api";
import { Slider, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ScalePart {
	name: string;
	percentage: number;
	image: File | null;
}

interface Props {
	title: string;
	isView?: boolean;
}

export default function DefaultLayout({ title, isView }: Props) {
	const router = useRouter();
	const params = useParams();
	const { scaleId, scalePartId } = params;

	const [formDataValues, setFormDataValues] = useState<ScalePart>({
		name: "",
		percentage: 0,
		image: null,
	});

	useEffect(() => {
		if (scalePartId) {
			api.get(`/scale/part/${scalePartId}`).then(res => {
				console.log("res", res.data);
				const { name, percentage, image } = res.data;
				setFormDataValues({
					name,
					percentage: Number(percentage),
					image,
				});
			});
		}
	}, [scalePartId]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		formData.append("percentage", String(formDataValues.percentage));
		formData.append("name", formDataValues.name);
		formData.append("image", formDataValues.image as File);

		// const formValues: Record<string, FormDataEntryValue> = {};

		// formData.forEach((value, key) => (formValues[key] = value));

		console.log("fd e fv", formData, /*formValues, */ typeof scalePartId);

		if (scalePartId) {
			api.put(`/scale/part/${scalePartId}`, formData).then(res => {
				console.log(res.data);
				router.replace(`/scale-part/${scaleId}`);
			});
			return;
		}

		api.post(`/scale/part/${scaleId}`, formData).then(res => {
			console.log(res.data);
			router.replace(`/scale-part/${scaleId}`);
		});

		// api.post("/upload-image", { image: formDataValues.image }).then(res => {
		// 	console.log(res);
		// });
	};

	return (
		<Layout
			title={title}
			headerTitle="Escalas"
			menuActiveKey="scale">
			{/* {loading ? (
				<>
					<Loader />
				</>
			) : ( */}
			<form
				className="mt-10 flex flex-col items-center"
				encType="multipart/form-data"
				onSubmit={handleSubmit}>
				<TextField
					name="name"
					label="Título"
					variant="outlined"
					color="success"
					disabled={isView}
					className="mb-10 w-8/10"
					value={formDataValues.name}
					onChange={e =>
						setFormDataValues({
							...formDataValues,
							name: e.target.value,
						})
					}
				/>
				<Slider
					name="percentage"
					onChange={(_, value) => {
						setFormDataValues({
							...formDataValues,
							percentage: Number(value),
						});
					}}
					aria-label="Default"
					valueLabelDisplay="on"
					disabled={isView}
					className="mb-10 w-8/10 text-slider"
					value={formDataValues?.percentage}
				/>
				{/* <input
					type="file"
					name="image"
				/> */}
				<MuiFileInput
					itemType="file"
					className="mb-10 w-8/10"
					value={formDataValues.image}
					onChange={newValue =>
						setFormDataValues({
							...formDataValues,
							image: newValue,
						})
					}
					name="image"
				/>
				{!isView && (
					<>
						<DefaultFABSaveIcon
							type="submit"
							routeRedirect={`/scale-part/${scaleId}`}
						/>
					</>
				)}
			</form>
			{/* )} */}
		</Layout>
	);
}
