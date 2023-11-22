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
	image: string;
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
		image: "",
	});
	const [image, setImage] = useState<File | null>(null);

	useEffect(() => {
		if (scalePartId) {
			api.get(`/scale/part/${scalePartId}`).then(res => {
				const { name, percentage, image } = res.data;

				if (image) {
					api.get(`/file/${image}`).then(res => {
						setImage(new File([res.data], `${image}`));
					});
				}

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

		const valuesToSend = {
			...formDataValues,
			percentage: String(formDataValues.percentage),
		};

		if (scalePartId) {
			api.put(`/scale/part/${scalePartId}`, valuesToSend).then(() => {
				router.replace(`/scale-part/${scaleId}`);
			});
			return;
		}

		api.post(`/scale/part/${scaleId}`, valuesToSend).then(() => {
			router.replace(`/scale-part/${scaleId}`);
		});
	};

	const handleSaveImage = async (file: File | null) => {
		if (!file) return;

		const formData = new FormData();

		formData.append("image", file);

		api.post("/file", formData).then(res => {
			const { filename } = res.data;
			setFormDataValues({
				...formDataValues,
				image: filename,
			});

			api.get(`/file/${filename}`).then(res => {
				setImage(new File([res.data], `${filename}`));
			});
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
						handleSaveImage(newValue);
						// setFormDataValues({
						// 	...formDataValues,
						// 	image: newValue,
						// });
						// setImage(newValue);
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
