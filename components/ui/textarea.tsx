import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn('min-h-32 w-full resize-y rounded-2xl border border-[#ebe7f5] bg-white px-4 py-3.5 text-brand-text outline-none transition focus:border-brand-violet focus:ring-4 focus:ring-brand-violet/10', className)}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
