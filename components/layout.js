import Navbar from "./Navbar";
import { useState, cloneElement } from "react";
import React from "react";

export default function Layout({ children }) {
    const [theme, setTheme] = useState("dark");

    const childrenWithProps = React.Children.map(children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { theme });
        }
        return child;
    });

    return (
    <>
      <Navbar theme={theme} setTheme={setTheme}/>
      <main>{childrenWithProps}</main>
    </>
  );
}