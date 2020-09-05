import React from "react";
import "./navigation.scss";

export default function Navigation({children}: {children: React.ReactNode}) {

  return (
    <nav className="nav">
      <img src="/shoppies.png" className="nav-logo" alt="Logo" />
      {children}
    </nav>
  )
}