import React, { ReactNode } from "react";
import "./Shimmer.css";

function Shimmer({ children }: { children: ReactNode }) {
  return <div className="shimmer">{children}</div>;
}

export default Shimmer;
