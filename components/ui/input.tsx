import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn('w-full rounded-2xl border border-[#ebe7f5] bg-white px-4 py-3.5 text-brand-text outline-none transition focus:border-brand-violet focus:ring-4 focus:ring-brand-violet/10', className)}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
