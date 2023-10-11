import MainLayout from "@/components/MainLayout";
import Menu from "@/components/Menu";

export default function Home() {
	return (
		<main className="flex flex-row min-h-screen min-w-max">
			<Menu />
			<MainLayout />
		</main>
	);
}