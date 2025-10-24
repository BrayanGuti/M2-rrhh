// Componente Avatar (Convertido a función declarativa)
export function Avatar({ className = "", children, ...props }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full overflow-hidden ${className}`}
      {...props}
    >
      {children}{" "}
    </div>
  );
}

// Componente AvatarFallback (Convertido a función declarativa)
export function AvatarFallback({ className = "", children, ...props }) {
  return (
    <div
      className={`flex items-center justify-center w-full h-full text-sm font-medium ${className}`}
      {...props}
    >
      {children}{" "}
    </div>
  );
}
