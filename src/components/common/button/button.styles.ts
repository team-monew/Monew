export type Variant = "primary" | "secondary" | "tertiary";
export type Size = "sm" | "lg";

const primaryStyles = "bg-cyan-500 text-white hover:bg-cyan-600";

const secondaryStyles =
  "bg-white border border-cyan-500 text-cyan-500 hover:border-cyan-600 hover:text-cyan-600";

const tertiaryStyles =
  "bg-white border border-gray-400 text-gray-400 hover:border-gray-600 hover:text-gray-600";

export const baseStyles =
  "inline-flex items-center justify-center gap-2.5 transition select-none focus:outline-none";

export const variantStyles: Record<Variant, string> = {
  primary: primaryStyles,
  secondary: secondaryStyles,
  tertiary: tertiaryStyles,
};

export const sizeStyles: Record<Size, string> = {
  sm: "h-[40px] rounded-[10px] text-14-sb",
  lg: "h-[56px] rounded-[12px] text-20-sb",
};

export const disabledStyles = "bg-gray-200 text-gray-600";

export function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}
