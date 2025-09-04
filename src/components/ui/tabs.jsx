// src/components/ui/tabs.jsx
import React from 'react';

export function Tabs({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ children, className }) {
  return <button className={className}>{children}</button>;
}

export function TabsContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
