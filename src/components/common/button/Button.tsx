import { cx, buttonClass } from "./button.styles";
import type { ButtonStyleProps } from "./button.styles";

type ButtonProps = React.ComponentPropsWithRef<"button"> & ButtonStyleProps;

export default function Button({ className, ...props }: ButtonProps) {
  const { variant, size, fullWidth, disabled, ...rest } = props;
  return (
    <button
      className={cx(
        buttonClass({ variant, size, fullWidth, disabled, ...rest }),
        className
      )}
      disabled={disabled}
      {...rest}
    />
  );
}
