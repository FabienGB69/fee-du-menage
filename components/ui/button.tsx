import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'whatsapp';
type ButtonSize = 'default' | 'sm' | 'lg';

const variants: Record<ButtonVariant, string> = {
  default: 'bg-brand-gradient text-white shadow-[0_18px_34px_rgba(125,42,232,0.28)]',
  secondary: 'border border-[#ebe7f5] bg-white text-brand-violet shadow-[0_14px_30px_rgba(73,48,131,0.09)]',
  outline: 'border border-[#ebe7f5] bg-white text-brand-violet shadow-[0_14px_30px_rgba(73,48,131,0.09)]',
  whatsapp: 'bg-[#25D366] text-white shadow-[0_18px_34px_rgba(37,211,102,0.28)]'
};

const sizes: Record<ButtonSize, string> = {
  default: 'min-h-12 px-5 py-3',
  sm: 'min-h-10 px-4 py-2',
  lg: 'min-h-14 px-7 py-4 text-base'
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full text-sm font-extrabold transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:cursor-wait disabled:opacity-70',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button };
