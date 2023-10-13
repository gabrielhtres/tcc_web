// Generate segments for [category]
export async function generateStaticParams({
	params,
}: {
	params: { type: string };
}) {
	return [
		{
			type: "edit",
		},
		{
			type: "detail",
		},
	];
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return children;
}
