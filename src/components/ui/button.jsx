import React from 'react';

export function Button({ children, onClick, className, variant = 'default' }) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
