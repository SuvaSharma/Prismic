import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
  color?: string; // Custom color for h3 heading
};

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
  color, // Custom color for h3
}: HeadingProps) {
  // Apply different styles based on the heading level
  const isH3 = Comp === "h3"; // Check if it's an h3 element

  return (
    <Comp
      className={clsx(
        "font-bold leading-tight tracking-tight", 
        size === "xl" && "text-7xl md:text-9xl",
        size === "lg" && "text-6xl md:text-8xl",
        size === "md" && "text-5xl md:text-6xl",
        size === "sm" && "text-3xl md:text-4xl",
        !isH3 && "stroke-[#295F98] stroke-[1px] text-[#ffffff]", // Apply stroke for all but h3
        isH3 && color, // Apply custom color for h3 (if provided)
        className
      )}
      style={isH3 ? undefined : { WebkitTextStroke: "1px #295F98" }} // Apply stroke only for other headings
    >
      {children}
    </Comp>
  );
}
