import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.ComponentProps<"div"> {}
export const Container: React.FC<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cn("max-w-5xl mx-auto px-5", className)}>
      {children}
    </div>
  );
};
