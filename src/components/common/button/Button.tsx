import type { ReactNode } from "react";
import {
  baseStyles,
  variantStyles,
  sizeStyles,
  disabledStyles,
  cx,
} from "./button.styles";
import type { Variant, Size } from "./button.styles";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "lg",
  disabled = false,
  className,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const buttonStyles = cx(
    baseStyles,
    sizeStyles[size],
    disabled ? disabledStyles : variantStyles[variant],
    className
  );

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
