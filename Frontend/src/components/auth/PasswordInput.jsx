import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

function PasswordInput({
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "Enter password",
  required = true,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">

      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>

      {/* Input wrapper */}
      <div className="relative">

        {/* Lock icon */}
        <FaLock
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        {/* Password input */}
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="
            w-full
            h-14
            rounded-xl
            border
            border-gray-300
            dark:border-gray-800
            dark:text-gray-800
            pl-11
            pr-12
            outline-none
            transition
            focus:border-green-500
            focus:ring-2
            focus:ring-green-100
          "
        />

        {/* Show / Hide */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-500
            hover:text-green-600
            transition
          "
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
        >
          {showPassword ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </button>

      </div>

    </div>
  );
}

export default PasswordInput;