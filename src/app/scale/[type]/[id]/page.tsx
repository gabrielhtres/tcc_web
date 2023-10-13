"use client";

import { useParams } from "next/navigation";

export default function ScaleDetail() {
	const params = useParams();
	console.log(params);

	return <h1>Scale Detail</h1>;
}
