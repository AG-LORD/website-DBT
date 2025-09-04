// src/components/ui/alert.jsx
import React from 'react';

export function Alert({ children, className }) {
  return <div role="alert" className={className}>{children}</div>;
}

export function AlertDescription({ children, className }) {
  return <p className={className}>{children}</p>;
}
