import "./globals.css";
import { Fira_Sans } from "next/font/google";

import { Metadata } from "next";
import { CartProvider } from "@/cartContext";

const firaSans = Fira_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Yum Yum Gim Mie Sum Foodtruck",
  description: "Foodtruck ordering system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaSans.className}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
