import Navbar from "./Navbar";
import { useState, cloneElement } from "react";

export default function Layout({ children }) {
    const [theme, setTheme] = useState("dark");

    const childrenWithProps = React.Children.map(children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return cloneElement(child, { theme });
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