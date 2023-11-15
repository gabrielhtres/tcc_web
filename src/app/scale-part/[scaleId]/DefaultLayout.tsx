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
	const [image, setImage] = useState<File | null>(null);

	useEffect(() => {
		if (scalePartId) {
			api.get(`/scale/part/${scalePartId}`).then(res => {
				// console.log("res", res.data);
				const { name, percentage, image } = res.data;

				setFormDataValues({
					name,
					percentage: Number(percentage),
					image,
				});

				api.get(`/file/${image}`).then(res => {
					// console.log(res);
					setImage(new File([res.data], `${image}`));
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

		if (scalePartId) {
			api.put(`/scale/part/${scalePartId}`, formData).then(res => {
				// console.log(res.data);
				router.replace(`/scale-part/${scaleId}`);
			});
			return;
		}

		api.post(`/scale/part/${scaleId}`, formData).then(res => {
			// console.log(res.data);
			router.replace(`/scale-part/${scaleId}`);
		});
	};

	return (
		<Layout
			title={title}
			headerTitle="Escalas"
			menuActiveKey="scale">
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
					step={0.1}
				/>
				<MuiFileInput
					itemType="file"
					disabled={isView}
					className="mb-10 w-8/10"
					value={image}
					onChange={newValue => {
						setFormDataValues({
							...formDataValues,
							image: newValue,
						});
						setImage(newValue);
					}}
					name="image"
				/>
				{image && (
					<div
						className="mb-10 w-8/10"
						style={{
							minHeight: 200,
							backgroundImage: `url(http://localhost:3030/file/${formDataValues.image})`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "contain",
						}}
					/>
				)}
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
