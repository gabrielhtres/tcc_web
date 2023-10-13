"use client";

import { useParams } from "next/navigation";

export default function Scale() {
	const params = useParams();
	console.log(params);
	return <div>Scale</div>;
}
