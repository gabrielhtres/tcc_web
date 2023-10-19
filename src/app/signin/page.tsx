"use client";

import { Box, Button, TextField } from "@mui/material";
import BackgroundImage from "../../assets/background.png";
import Logo from "../../assets/logo.svg";
import Image from "next/image";
import { useRef } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import nookies from "nookies";

export default function SignIn() {
	const cpfInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const router = useRouter();

	const handleSubmit = () => {
		const cpf = cpfInputRef.current?.value;
		const password = passwordInputRef.current?.value;

		if (!cpf || !password) {
			return;
		}

		api.post("/signin", {
			email: cpf,
			password,
		})
			.then(res => {
				// console.log("token data", res.data.token);
				nookies.set(null, "token", res.data.token, {
					path: "/",
					maxAge: 1800,
				});
				// const tokenLocal = localStorage.getItem("token");
				// console.log("token local", tokenLocal);
				router.replace("/scale");
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<Box
			style={{ backgroundImage: `url(${BackgroundImage.src})` }}
			className="flex h-screen w-screen items-center justify-center bg-cover bg-no-repeat">
			<Box className="radius flex h-4/6 w-1/2 flex-col items-center justify-evenly rounded-3xl bg-white py-5">
				<Image
					src={Logo}
					alt="GreenVision"
					className="w-52"
				/>
				<p className="font-semibold">Entrar</p>
				<TextField
					label="CPF"
					variant="outlined"
					color="success"
					className="w-8/10"
					inputRef={cpfInputRef}
				/>
				<TextField
					label="Senha"
					variant="outlined"
					color="success"
					className="w-8/10"
					inputRef={passwordInputRef}
				/>
				<Button
					className="h-12 w-8/10 bg-primary text-white hover:bg-secondary"
					onClick={handleSubmit}>
					Entrar
				</Button>
			</Box>
		</Box>
	);
}
