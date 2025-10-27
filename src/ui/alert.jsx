// src/components/ui/alert.jsx
import React from "react";
import { cn } from "../lib/utils";

export const Alert = React.forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-gray-50 text-gray-800 border-gray-200",
      destructive: "bg-red-50 text-red-800 border-red-200",
      success: "bg-green-50 text-green-800 border-green-200",
      warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
      info: "bg-blue-50 text-blue-800 border-blue-200",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "border p-4 rounded-md flex items-start space-x-2",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export const AlertDescription = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm leading-relaxed", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
AlertDescription.displayName = "AlertDescription";

export const AlertTitle = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={cn("font-medium leading-tight", className)}
        {...props}
      >
        {children}
      </h4>
    );
  }
);
AlertTitle.displayName = "AlertTitle";
