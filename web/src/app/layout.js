// import { Inter } from "next/font/google";
import "./globals.css";
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';


// these config are for setting font
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  // set the title and description of the page
  title: "I-FAM",
  description: "Welcome to I-FAM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        // className={inter.className}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
