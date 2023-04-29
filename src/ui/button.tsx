import type { ButtonHTMLAttributes } from 'react';

type Variant = keyof typeof variants;
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

const variants = {
  brand:
    'bg-brand [&>*]:invert enabled:hover:bg-opacity-90 ' +
    'disabled:opacity-50',
  outline:
    'outline outline-1 outline-brand enabled:hover:bg-brand ' +
    'enabled:hover:bg-opacity-10 disabled:opacity-50',
};

export default function Button({ children, variant, ...props }: Props) {
  return (
    <button
      {...props}
      className={`select-none rounded px-3 py-0.5 shadow disabled:cursor-not-allowed
                  ${variants[variant ?? 'brand']} ${props.className}`}
    >
      <span>{children}</span>
    </button>
  );
}
