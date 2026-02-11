import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { UserProvider } from "../context/UserContext";
import { FlightsProvider } from "../context/FlightsContext";
import type { LayoutProps } from "../types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <UserProvider>
      <FlightsProvider>
        <div className="flex flex-col min-h-screen bg-gray-50  min-w-[900px]">
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </FlightsProvider>
    </UserProvider>
  );
};

export default Layout;
