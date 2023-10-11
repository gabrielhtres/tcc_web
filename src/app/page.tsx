'use client';

import Scale from "./scale/page";
import SignIn from "./signin/page";

export default function Home(props: any) {
	console.log(props)
	const token = 'ta';//window.localStorage.getItem("token") as string;

	return token ? <Scale /> : <SignIn />;
}