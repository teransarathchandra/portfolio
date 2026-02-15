import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-background font-semibold hover:neon-glow-sm hover:brightness-110 focus-visible:neon-glow-sm active:scale-[0.97]',
  secondary:
    'border border-accent/30 text-accent hover:bg-accent-dim hover:border-accent/60 active:scale-[0.97]',
  ghost:
    'text-secondary-text hover:text-primary-text hover:bg-white/5 active:bg-white/10',
};

const sizes: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm rounded-lg min-h-[36px]',
  md: 'px-5 py-2.5 text-sm rounded-xl min-h-[40px]',
  lg: 'px-7 py-3 text-base rounded-xl min-h-[44px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out cursor-pointer select-none ${variants[variant]} ${sizes[size]} ${className}`;

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
