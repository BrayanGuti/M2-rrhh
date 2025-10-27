import { cn } from "../lib/utils";

/**
 * Skeleton Component
 *
 * Uso:
 * <Skeleton className="h-4 w-[250px]" />
 *
 * Ideal para placeholders durante la carga de datos.
 */

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
    />
  );
}
