import { CSSProperties, ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type BoundedProps<C extends ElementType<{ className?: string }>> = {
  as?: C;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<C>, "as" | "className" | "children" | "style">;

export function Bounded<C extends ElementType<{ className?: string }> = "section">({
  as,
  className,
  children,
  ...restProps
}: BoundedProps<C>) {
  const Comp = (as || "section") as ElementType<{ className?: string }>;
  return (
    <Comp
      className={clsx(
        "px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}