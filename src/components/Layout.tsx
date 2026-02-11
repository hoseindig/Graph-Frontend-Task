import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { UserProvider } from "../context/UserContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </div>
    </UserProvider>
  );
};

export default Layout;
