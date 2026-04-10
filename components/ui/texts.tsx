import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/utilities';

const textVariants = cva('text-greyscale-950 transition-colors', {
  variants: {
    variant: {
      'body-light-xl': 'text-size-body-xl light',
      'body-xl': 'text-size-body-xl',
      'body-l': 'text-size-body-l',
      'body-m': 'text-size-body-m',
      'body-m-regular': 'text-size-body-xs',
      'body-s': 'text-size-body-s',
      'body-xs': 'text-size-body-xs',
      'text-underlined': 'text-size-body-xs underlined',
    },
  },
  defaultVariants: {
    variant: 'body-m',
  },
});

type TextProps = {
  as?: 'p' | 'span' | 'div';
} & React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof textVariants>;

function Text({ className, variant = 'body-m', as, ...props }: TextProps) {
  const Tag = as || 'p';

  return <Tag className={cn(textVariants({ variant, className }))} {...props} />;
}

export { Text, textVariants };
