'use client';
import React from 'react';
import clsx from 'clsx';

interface ShimmerTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function ShimmerText({ children, className, ...rest }: ShimmerTextProps) {
  return (
    <span
      className={clsx(
        'relative inline-block shimmer-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 bg-[length:220%_220%] text-transparent bg-clip-text',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}