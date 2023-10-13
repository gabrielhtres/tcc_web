"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const token = false; //window.localStorage.getItem("token") as string;

	useEffect(() => {
		if (token) {
			router.replace("/scale");
		} else {
			router.replace("/signin");
		}
	}, []);

	return <></>;
}
