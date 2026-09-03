import { motion } from "framer-motion";

function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  icon = null,
}) {
  return (
    <motion.button
      whileHover={{
        scale: disabled ? 1 : 1.04,
        y: disabled ? 0 : -2,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        eco-btn
        flex
        items-center
        justify-center
        gap-2
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {icon}

      {children}
    </motion.button>
  );
}

export default Button;