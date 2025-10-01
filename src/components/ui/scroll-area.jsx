
// src/components/ui/scroll-area.jsx
import React, { forwardRef } from "react";

const ScrollArea = forwardRef(({ children, className = "", style = {} }, ref) => {
  return (
    <div
      ref={ref}
      className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ${className}`}
      style={{ maxHeight: "100%", ...style }}
    >
      {children}
    </div>
  );
});

export { ScrollArea };
