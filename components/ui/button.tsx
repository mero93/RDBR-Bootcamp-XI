import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils/utilities';

const buttonVariants = cva(
  `border-box disabled:!text-greyscale-400 relative flex items-center
  justify-center font-semibold transition-all duration-300
  disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        primary: cn(
          '!text-greyscale-50 border-2 border-purple-500 bg-purple-500',
          'focus:border-purple-700 focus:bg-purple-600',
          'hover:border-purple-600 hover:bg-purple-600',
          'active:border-purple-700 active:bg-purple-700',
          'disabled:bg-greyscale-300 disabled:border-greyscale-300',
          'rounded-xs px-[calc(1.5625rem-2px)] py-[calc(1.0625rem-2px)]'
        ),
        outline: cn(
          'border-2 border-purple-300 !text-purple-500',
          'hover:!text-greyscale-50 hover:border-purple-600 hover:bg-purple-600',
          'focus:border-purple-100 focus:bg-purple-600',
          'focus:!text-greyscale-50 focus:border-dashed',
          'active:!text-greyscale-50 active:border-purple-700 active:bg-purple-700',
          'disabled:bg-greyscale-300 disabled:border-greyscale-400',
          'rounded-xs px-[calc(1rem-2px)] py-[calc(0.75rem-2px)]'
        ),
        ghost: cn(
          'border-b-2 border-purple-500 !text-purple-500',
          'hover:border-purple-600 hover:!text-purple-600',
          'active:border-purple-700 active:!text-purple-700',
          'focus:border-dashed focus:border-purple-700 focus:!text-purple-700',
          'disabled:!text-greyscale-300 disabled:border-greyscale-300',
          'p-4 pb-[calc(1rem-2px)]'
        ),
      },
      size: {
        medium: 'text-body-l',
        small: 'text-body-s',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

function Button({
  className,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  asChild = false,
  ...properties
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      type={asChild ? undefined : type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...properties}
    />
  );
}

export { Button, buttonVariants };
