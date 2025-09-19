type Size = "sm" | "lg";
type Variant = "primary" | "secondary" | "tertiary";

export type ButtonStyleProps = {
  size?: Size;
  variant?: Variant;
  disabled?: boolean;
};

const primaryStyle =
  "bg-cyan-500 text-white" +
  "hover:bg-cyan-600" +
  "disabled:bg-gray-200 disabled:text-gray-600";

const secondaryStyle =
  "bg-white border border-cyan-500 text-cyan-500" +
  "hover:border-cyan-600 hover:text-cyan-600";

const tertiaryStyle =
  "bg-white border border-gray-400 text-gray-400" +
  "hover:border-gray-600 hover:text-gray-600";

export const variantStyle: Record<Variant, string> = {
  primary: primaryStyle,
  secondary: secondaryStyle,
  tertiary: tertiaryStyle,
};

export const sizeStyle: Record<Size, string> = {
  lg: "h-[56px] rounded-[12px] text-20-sb",
  sm: "h-[40px] rounded-[10px] text-14-sb",
};

export const baseStyle =
  "inline-flex items-center justify-center gap-2.5 transition select-none focus:outline-none";
