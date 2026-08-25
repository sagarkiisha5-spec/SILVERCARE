import React from 'react';
import { cn } from '@/src/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-slate-900 text-white shadow hover:bg-slate-900/90': variant === 'default',
            'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900': variant === 'outline',
            'hover:bg-slate-100 hover:text-slate-900': variant === 'ghost',
            'text-slate-900 underline-offset-4 hover:underline': variant === 'link',
            'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
            'h-9 px-4 py-2': size === 'md',
            'h-8 rounded-md px-3 text-xs': size === 'sm',
            'h-10 rounded-md px-8': size === 'lg',
            'h-9 w-9': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
