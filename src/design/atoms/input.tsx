import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-300">{label}</label>
        )}
        <input
          ref={ref}
          className={`
            w-full rounded-lg border border-gray-600 bg-gray-800
            px-3 py-2 text-sm text-gray-100 placeholder-gray-500
            outline-none transition-colors
            focus:border-purple-500 focus:ring-1 focus:ring-purple-500
            disabled:cursor-not-allowed disabled:opacity-50
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';