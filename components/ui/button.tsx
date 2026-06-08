import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-extrabold transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:cursor-wait disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'bg-brand-gradient text-white shadow-[0_18px_34px_rgba(125,42,232,0.28)]',
        secondary: 'border border-[#ebe7f5] bg-white text-brand-violet shadow-[0_14px_30px_rgba(73,48,131,0.09)]',
        outline: 'border border-[#ebe7f5] bg-white text-brand-violet shadow-[0_14px_30px_rgba(73,48,131,0.09)]',
        whatsapp: 'bg-[#25D366] text-white shadow-[0_18px_34px_rgba(37,211,102,0.28)]'
      },
      size: {
        default: 'min-h-12 px-5 py-3',
        sm: 'min-h-10 px-4 py-2',
        lg: 'min-h-14 px-7 py-4 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
