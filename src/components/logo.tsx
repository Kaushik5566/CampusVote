import * as React from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M15 28.3975L50 10L85 28.3975V65.1025L50 83.5L15 65.1025V28.3975Z"
        fill="currentColor"
      />
      <path
        d="M35 45L50 55L65 45"
        stroke="#F2EFFF"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 55V75"
        stroke="#F2EFFF"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}
