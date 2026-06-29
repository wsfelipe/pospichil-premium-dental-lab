import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({ id, children, className, containerClassName }: Props) {
  return (
    <section
      id={id}
      className={cn("relative w-full py-24 md:py-32 scroll-mt-24", className)}
    >
      <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className }: HeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl leading-[1.1] text-foreground md:text-5xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg text-balance">
          {description}
        </p>
      )}
    </div>
  );
}