import type { Metadata } from 'next';
import { /*Inter, */ Roboto } from 'next/font/google';
import './globals.css';
// import Scale from "./scale/page";
// import SignIn from "./signin/page";
// import Layout from "@/components/Layout";
// import { getLocalStorageItem } from "@/utils/localStorage";

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ['latin'], weight: '300' });

export const metadata: Metadata = {
  title: 'GreenVision',
  description:
    'GreenVision é uma aplicação para auxiliar no monitoramento de doenças na cultura do milho.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const token = getLocalStorageItem("token");

  return (
    <html lang="pt">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
