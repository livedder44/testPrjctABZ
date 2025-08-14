import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';
import s from './Button.module.scss';
import Preloader from '@/components/Preloader/Preloader';

type CommonProps = {
  variant?: 'yellow';
  loading?: boolean;    
  children: ReactNode;
  className?: string;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  CommonProps & {
    href: string;      
  };

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  CommonProps & {
    href?: never;      
  };

type Props = AnchorProps | NativeButtonProps;

export default function Button(props: Props) {
  const { variant = 'yellow', className = '', children } = props;
  const classes = `${s.btn} ${s[variant]} ${className}`;


  if ('href' in props && props.href) {
    const { href, loading, variant: _v, className: _c, children: _ch, ...anchorRest } =
      props as AnchorProps;

    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const {
    loading = false,
    disabled,
    variant: _v,
    className: _c,
    children: _ch,
    ...buttonRest
  } = props as NativeButtonProps;

  return (
    <button
      className={classes}
      disabled={loading || !!disabled}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {loading ? <Preloader size={18} /> : children}
    </button>
  );
}
