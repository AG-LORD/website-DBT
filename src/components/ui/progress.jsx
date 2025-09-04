import React from 'react';

export function Progress({ value, max = 100, className }) {
  return <progress value={value} max={max} className={className} />;
}
