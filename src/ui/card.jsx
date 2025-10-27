import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={cn("p-5 border-b border-gray-100", className)} {...props} />
  );
}
export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-lg font-semibold text-gray-800", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p className={cn("text-sm text-gray-500 mt-1", className)} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-5 text-gray-700", className)} {...props} />;
}
export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        "p-4 border-t border-gray-100 flex items-center justify-end",
        className
      )}
      {...props}
    />
  );
}
