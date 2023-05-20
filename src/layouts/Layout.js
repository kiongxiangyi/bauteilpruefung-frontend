import React from "react";
import Header from "../components/Header";

// The Layout component take cares of the core layout of our application
// The layout component can have Header, Footer, Side Navigation etc
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
