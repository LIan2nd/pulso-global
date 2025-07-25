import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const InputText = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
  icon: Icon,
  error,
  required = false
}) => {
  // State for focus styling and password visibility toggle
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Determine the actual input type (handles password visibility toggle)
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative mb-6">
      {/* Label with optional required indicator */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Left icon (if provided) */}
        {Icon && (
          <div
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            aria-hidden="true"
          >
            <Icon
              className={`h-5 w-5 transition-colors duration-200 ${isFocused ? 'text-purple-400' : 'text-gray-400'
                }`}
            />
          </div>
        )}

        {/* Main input element */}
        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'
            } ${type === 'password' ? 'pr-10' : 'pr-4'
            } py-3 bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          transition-all duration-200 ${error
              ? 'border-red-400 focus:ring-red-500'
              : isFocused
                ? 'border-purple-400'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />

        {/* Password visibility toggle (only for password inputs) */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Error message display */}
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-400 flex items-center gap-1"
          role="alert"
        >
          {/* Error icon */}
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputText;