import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../app/globals.css";
import { Providers } from "./Providers/provider";
import { Toaster } from "react-hot-toast";



const poppins = Poppins(
  {
    subsets : ['latin'],
    weight : ['400','500','600'] ,
    variable : '--font-Poppins',
  }
)

export const metadata: Metadata = {
  title: "FoodDeliveryApp",
  description: "Food Delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable}`}>

        <Providers>{children}</Providers>
        <Toaster position="top-center" reverseOrder={false}/>

      </body>
    </html>
  );
}
