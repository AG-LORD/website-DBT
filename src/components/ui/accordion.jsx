
// src/components/ui/accordion.jsx
import React, { useState, createContext, useContext } from "react";

const AccordionContext = createContext();

export function Accordion({ children, type = "single", collapsible = false, className = "" }) {
  const [openItems, setOpenItems] = useState(type === "single" ? null : []);

  const toggleItem = (value) => {
    if (type === "single") {
      if (openItems === value && collapsible) setOpenItems(null);
      else setOpenItems(value);
    } else {
      if (openItems.includes(value))
        setOpenItems(openItems.filter((item) => item !== value));
      else setOpenItems([...openItems, value]);
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, value }) {
  return <div>{React.Children.map(children, (child) => React.cloneElement(child, { value }))}</div>;
}

export function AccordionTrigger({ children, value, className = "" }) {
  const { openItems, toggleItem, type } = useContext(AccordionContext);
  const isOpen = type === "single" ? openItems === value : openItems.includes(value);

  return (
    <button
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
      aria-controls={`${value}-content`}
      id={`${value}-header`}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}

export function AccordionContent({ children, value, className = "" }) {
  const { openItems, type } = useContext(AccordionContext);
  const isOpen = type === "single" ? openItems === value : openItems.includes(value);

  return (
    <div
      role="region"
      id={`${value}-content`}
      aria-labelledby={`${value}-header`}
      hidden={!isOpen}
      className={className}
    >
      {children}
    </div>
  );
}
