import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { cn } from "@/lib/utils";

export function HeroSection(
    {
        children,
        className
    }: {
        children?: React.ReactNode;
        className?: string
    }
) {
  return (
    <section className={cn("relative z-10 w-full mx-auto flex flex-col items-center justify-center", className)}>
      <BackgroundRippleEffect />
      {
        children
      }
    </section>
  );
}