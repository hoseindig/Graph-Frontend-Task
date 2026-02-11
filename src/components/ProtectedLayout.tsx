import React from "react";
import Layout from "./Layout";
import { UserProvider } from "../context/UserContext";
import { FlightsProvider } from "../context/FlightsContext";
import type { LayoutProps } from "../types";

const ProtectedLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <UserProvider>
      <FlightsProvider>
        <Layout>{children}</Layout>
      </FlightsProvider>
    </UserProvider>
  );
};

export default ProtectedLayout;
