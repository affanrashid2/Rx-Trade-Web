"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";

import "./globals.css";
import { MuiThemeProvider } from "@/components";
import AppProvider from "@/hoc/app-provider";
import store from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <title>RX Trade</title>
      </head>
      <MuiThemeProvider>
        <Provider store={store}>
          <body className={inter.className}>
            <AppProvider>{children}</AppProvider>
          </body>
        </Provider>
      </MuiThemeProvider>
    </html>
  );
}
