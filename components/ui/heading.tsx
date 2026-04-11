import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/utilities';

const headingVariants = cva('text-greyscale-950 transition-colors', {
  variants: {
    variant: {
      display: 'text-display-xl font-bold tracking-[-0.005em]', // Ag XL
      h1: 'text-h1 font-semibold tracking-[-0.005em]', // Ag 1
      h2: 'text-h2 font-semibold', // Ag 2
      h3: 'text-h3 font-semibold', // Ag 3
      h4: 'text-h4 font-semibold', // Ag 4
      h5: 'text-h5 font-semibold', // Ag 5
    },
  },
  defaultVariants: {
    variant: 'h1',
  },
});

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'div';
} & React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>;

const variantToTag: Record<string, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
};

function Heading({ className, variant = 'h1', as, ...props }: HeadingProps) {
  const Tag = as || variantToTag[variant || 'h1'];

  return <Tag className={cn(headingVariants({ variant, className }))} {...props} />;
}

export { Heading, headingVariants };
